from django import forms

# A form to validate the text entered by a user
class TextForm(forms.Form):
    text = forms.CharField(
        min_length=5,
        required=True,
    )

    def clean(self):
        cleaned_data = super(TextForm, self).clean()
        message = cleaned_data.get("text")
        # Turn message to lower case
        the_message = message.lower()

        # Checks if the message starts with I or My
        # If it does not start with either, there is an error
        if ((the_message.startswith('i ')) is False) and ((message.startswith('my ')) is False):
            raise forms.ValidationError("The text should start with the pronouns I or My")