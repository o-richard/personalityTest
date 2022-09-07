import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import links from "./Constants";
import HomeLayout from "./BasicLayout";
import logo from '../images/logo.png';

function Score_Results(props) {

    const score_percent = (a) => {
        // Ensure the score values are positive values
        const new_value = a + 1;
        const percent = Math.round((new_value / 2) * 100);
        return percent;
    }

    const quantile_percent = (a) => {
        const percent = Math.round((a / 1) * 100);
        return percent;
    }

    return (
        <>
            <Card.Subtitle className="text_score_results">Your score: <p className="text_profile_scores">{score_percent(props.score)} %</p>
            </Card.Subtitle>
            <Card.Subtitle className="text_score_results">
            Quantile(Shows belonging to some percent of the population): <p className="text_profile_scores">{quantile_percent(props.quantile)} %</p>
            </Card.Subtitle>
            <Card.Subtitle className="text_score_results">
            Level of certainity of results provided based on number of facts provided: <p className="text_profile_scores">{props.confidence_text} </p>
            </Card.Subtitle>
        </>
    );
};

function Big5profile(props) {
    // Calculate the percent of text in psychological information
    const psych_value_percent = (a) => {
        const percent = Math.round((a / 1) * 100);
        return percent;
    }

    const the_main_body = (
        <>
        <div className="header client_header">
            <img src = {logo} alt = "Personality Test" className="header_logo"/>

            <p className="desc title">The Big 5 Personality Traits.</p>
        </div>
        <Container fluid>
        <Row>
            <Col>
            <div className="text_control_buttons mb-2 mt-1">
                <button>
                <Link to="/" state={links.homepage}>
                Go back to the Homepage
                </Link>
                </button>
            </div>
            </Col>
        </Row>
        <Row>
            {props.psych_present == true ?
            <Col>
                <p className="text_profile_titles">
                The percentage of the psychological information present in the entered text is <span className="text_profile_scores">{psych_value_percent(props.psych_value)} %.</span> The higher the percentage, the more accurate the results.
                </p>
            </Col>
            :
                null
            }
        </Row>
        <Row>
            <Col xs={12} md={6} lg={4}>
            <Card border="warning" className="mt-2 mb-2 ml-2 mr-2">
                <Card.Img variant="top" src="https://images.ctfassets.net/4pzvszxmf15y/1yEkNHw45D6dLB7vyhdpql/ffb4eea1296392f2bcf7388b0f72c3e1/c3e5148a-da49-4d3c-abd7-94dadf9ece2b_small" className="text_profile_images" />
                <Card.ImgOverlay>
                    <Card.Body>
                    <Card.Title className="text_profile_titles">Agreeableness</Card.Title>
                    <Score_Results score={props.scores.agreeableness.score} quantile={props.scores.agreeableness.quantile} confidence_text={props.scores.agreeableness.confidence_text} />
                    <Card.Text>
                    Influencing people (Agreeableness) concerns the way someone balances their emotional understanding of other people, and their respect for differing viewpoints, with the style in which they try to influence or negotiate with them.
                    </Card.Text>
                    </Card.Body>
                </Card.ImgOverlay>
            </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
            <Card border="warning" className="mt-2 mb-2 ml-2 mr-2">
                <Card.Img variant="top" src="https://images.ctfassets.net/4pzvszxmf15y/2eHxQIpiBSJR6Vd8amELvR/6bfaeac1b1b0e461bc8d4bbb26c49642/0902c419-92a0-4855-8ff2-2e9875046556_small"  className="text_profile_images" />
                <Card.ImgOverlay>
                    <Card.Body>
                    <Card.Title className="text_profile_titles">Conscientiousness</Card.Title>
                    <Score_Results score={props.scores.conscientiousness.score} quantile={props.scores.conscientiousness.quantile} confidence_text={props.scores.conscientiousness.confidence_text} />
                    <Card.Text>
                    Delivering Results (Conscientiousness) concerns work style and how someone directs their efforts and attention toward completing tasks. The level of discipline, dedication, perseverance, organization and reliability are hallmark factors of this dimension.
                    </Card.Text>
                    </Card.Body>
                </Card.ImgOverlay>
            </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
            <Card border="warning" className="mt-2 mb-2 ml-2 mr-2">
                <Card.Img variant="top" src="https://images.ctfassets.net/4pzvszxmf15y/2ec4OnkZIU65BasPg2j5YY/46ec059363495bf9936a50433aa46a41/2f793151-b520-4cc9-91c8-5ddb0c091c94_small" className="text_profile_images" />
                <Card.ImgOverlay>
                    <Card.Body>
                    <Card.Title className="text_profile_titles">Neuroticism</Card.Title>
                    <Score_Results score={props.scores.neuroticism.score} quantile={props.scores.neuroticism.quantile} confidence_text={props.scores.neuroticism.confidence_text} />
                    <Card.Text>
                    Managing pressure (Neuroticism) concerns the manner in which someone deals with pressure and the way in which they control their emotions and underlying tension, in order to stay on task and cope with everyday challenges.
                    </Card.Text>
                    </Card.Body>
                </Card.ImgOverlay>
            </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
            <Card border="warning" className="mt-2 mb-2 ml-2 mr-2">
                <Card.Img variant="top" src="https://images.ctfassets.net/4pzvszxmf15y/3jTWPNKpc9ARoEZwAj7hBf/0b7aa0aa0e4f0d758ab3cd8b2250f369/5e021131-c2d9-4190-a7bb-9277d5a159ec_small" className="text_profile_images" />
                <Card.ImgOverlay>
                    <Card.Body>
                    <Card.Title className="text_profile_titles">Extraversion</Card.Title>
                    <Score_Results score={props.scores.extraversion.score} quantile={props.scores.extraversion.quantile} confidence_text={props.scores.extraversion.confidence_text} />
                    <Card.Text>
                    Engaging with people (Extraversion) concerns someone’s interest, investment and comfort in developing relationships with others - customers, clients, work groups or colleagues.
                    </Card.Text>
                    </Card.Body>
                </Card.ImgOverlay>
            </Card>
            </Col>
            <Col lg={4}></Col>
            <Col xs={12} md={6} lg={4}>
            <Card border="warning" className="mt-2 mb-2 ml-2 mr-2">
                <Card.Img variant="top" src="https://images.ctfassets.net/4pzvszxmf15y/6zFDrU4OM6NfWOdt6OGd41/111149d34c97489babc5dd3e37ebc927/c05e769f-2c6d-42e3-83b7-6ca4239e3da0_small" className="text_profile_images" />
                <Card.ImgOverlay>
                        <Card.Body>
                        <Card.Title className="text_profile_titles">Openness</Card.Title>
                        <Score_Results score={props.scores.openness.score} quantile={props.scores.openness.quantile} confidence_text={props.scores.openness.confidence_text} />
                        <Card.Text>
                        Solving Problems (Openness) concerns how someone thinks about work problems, projects and challenges, how receptive they are to new or different information or approaches, and the way this influences their decision-making.
                        </Card.Text>
                        </Card.Body>
                </Card.ImgOverlay>
            </Card>
            </Col>
        </Row>
        </Container>
        </>
    );

    return (
        <HomeLayout main_body={the_main_body} />
    );
};

export default Big5profile;