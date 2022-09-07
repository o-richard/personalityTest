import requests
import json
from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

from .forms import TextForm
from .utils import NEO_FEEDBACK

# Ensure a csrf cookie when one loads the page for the first time
@ensure_csrf_cookie
def index(request):
    '''Display the main page'''
    return render(request, 'quiz/index.html')

# Get the text from a client and give the feedback
def client_text(request):
    '''Determine if the text entered is psychological'''
    # Only accepts post requests
    if request.method == "POST":
        # Get the text from the frontend
        user_info = json.loads(request.body.decode('utf-8'))
        the_text = user_info['clienttext']
        entered_data = {
            "text":the_text,
        }
        form = TextForm(data=entered_data)
        # Check if the data entered is valid
        if form.is_valid():
            # Check if the text entered is pyschological
            classify_url = "https://api.sentino.org/item/classify"
            classify_data = {
                "text": the_text,
                "lang": "en"
            }
            classify_headers = {
                "Authorization": "Token " + settings.SENTINO_TOKEN,
                "Content-Type": "application/json",
            }
            classify_response = requests.request("POST", classify_url, json=classify_data, headers=classify_headers)

            value_returned = json.loads(classify_response.text)
            # The value of the psychological evaluation
            psych_value = value_returned['basics']['is_psy']

            # Get the profile of a person
            score_url = "https://api.sentino.org/score/text"
            score_data = {
                "text": the_text,

                "inventories": ["big5"],

                "lang": "en"
            }
            score_headers = {
                "Authorization": "Token " + settings.SENTINO_TOKEN,
            }
            score_response = requests.request("POST", score_url, json=score_data, headers=score_headers)
            
            score_text = score_response.text
            response_dict = {
                "psych_value" : psych_value,
                "score_response" : score_text,
            }
            return JsonResponse(response_dict)

        # If the data is invalid
        else:
            errors = {
                'error':'The data entered is invalid. Please ensure your text has a minimum of 5 characters.'
            }
            return JsonResponse(errors, status=400)

    # In case one ask for a get request. The method is not supported
    return render(request, 'error_handler/405.html', status=405)

# A list of expected numbers from the user
EXPECTED_NUMBERS = ['20', '50', '100']

# Get a questionnaire and send to the client
def get_questionnaire(request):
    # Check if the request method is a POST
    if request.method == "POST":
        user_info = json.loads(request.body.decode('utf-8'))
        the_number = user_info['selected_number']
        # Validate the number is part of the expected numbers. If not, the values are updated to 100.
        if the_number not in EXPECTED_NUMBERS:
            the_number = 100

        # Make a request to sentino
        # Use the big5 inventory
        questionnaire_url = "https://api.sentino.org/inventory/neo/questionnaire/create"
        # Ask for 90 questions
        questionnaire_data = {
            "n": the_number,
            "method":"sentino",
        }
        questionnaire_headers = {
            "Authorization": "Token " + settings.SENTINO_TOKEN,
            "Content-Type": "application/json",
        }
        questionnaire_response = requests.request("POST", questionnaire_url, json=questionnaire_data, headers=questionnaire_headers)

        questions = questionnaire_response.text
    
        response_dict = {
            "items": questions,
        }
        # Return the questions
        return JsonResponse(response_dict)
    # In case one ask for a get request. The method is not supported
    return render(request, 'error_handler/405.html', status=405)

# Expected reponses by a user to a questionnaire
EXPECTED_CHOICES = ['strongly agree', 'agree', 'slightly agree', 'neutral', 'slightly disagree', 'disagree', 'strongly disagree']

# Determine a person's profile based on a questionnaire according to the big 5 traits
def client_questionnaire(request):
    # Check if the request method is a POST
    if request.method == "POST":
        user_info = json.loads(request.body.decode('utf-8'))
        the_responses = user_info["the_answers"]

        # Store the list of facts to send to Sentino
        all_facts = []
        # Go through every response
        for one in the_responses:
            answer = one["answer"]
            # In case on of the responses is not excepted, do not add it.
            if answer in EXPECTED_CHOICES:
                my_dict = {
                    "text":  one["question"],
                    "response": answer
                }
                all_facts.append(my_dict)

        facts_url = "https://api.sentino.org/score/facts"
        
        facts_data = {
            "inventories": ["neo"],
            "facts": all_facts,
        }
        facts_headers = {
            "Authorization": "Token " + settings.SENTINO_TOKEN,
            "Content-Type": "application/json",
        }
        facts_response = requests.request("POST", facts_url, json=facts_data, headers=facts_headers)

        valid_response = "[" + facts_response.text + "]"
        scored_facts = json.loads(valid_response)
        
        all_traits = scored_facts[0]['scoring']['neo']
        # Get all dictionary keys
        all_traits_keys = all_traits.keys()

        # Store the traits of all big 5 groups
        extraversion_list = []
        conscientiousness_list = []
        openness_list = []
        agreeableness_list = []
        neuroticism_list = []

        # Loop through all keys
        for x in all_traits_keys:
            this_dict = {}
            this_dict['display_name'] = NEO_FEEDBACK[x]['name']
            this_dict['quantile'] = all_traits[x]['quantile']
            this_dict['score'] = all_traits[x]['score']
            this_dict['confidence'] = all_traits[x]['confidence']
            this_dict['confidence_text'] = all_traits[x]['confidence_text']
            # Append to the correct list
            if NEO_FEEDBACK[x]['type'] == 'conscientiousness':
                conscientiousness_list.append(this_dict)
            elif NEO_FEEDBACK[x]['type'] == 'extraversion':
                extraversion_list.append(this_dict)
            elif NEO_FEEDBACK[x]['type'] == 'openness':
                openness_list.append(this_dict)
            elif NEO_FEEDBACK[x]['type'] == 'agreeableness':
                agreeableness_list.append(this_dict)
            else:
                neuroticism_list.append(this_dict)

        response_dict = {
            "extraversion_list" : extraversion_list,
            "conscientiousness_list" : conscientiousness_list,
            "openness_list" : openness_list,
            "agreeableness_list" : agreeableness_list,
            "neuroticism_list" : neuroticism_list,
        }
        return JsonResponse(response_dict)

    # In case one ask for a get request. The method is not supported
    return render(request, 'error_handler/405.html', status=405)