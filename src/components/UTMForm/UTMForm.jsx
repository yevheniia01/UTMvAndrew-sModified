import React, {Component, Fragment} from 'react';
import CustomFormBuilder from '../CustomFormBuilder';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Information from './components/Information';
import OrganizationLogo from './components/OrganizationLogo';
import Title from './components/Title';
import axios from 'axios';
import config from '../../config/client';

class UTMForm extends Component {
    constructor(props){
        super(props);

        const composite = {
            name: 'UTM Content',
            label: 'UTM Content',
            type: 'composite',
            value: [
                [{
                    name: 'pg code',
                    label: 'PG Internal Code',
                    type: 'select',
                    options: [
                        { text: 'Guatemala', value: 'GT' },
                        { text: 'Honduras', value: 'HN' },
                        { text: 'Chile', value: 'CH' }
                    ]
                },
                {
                    name: 'Neurobion',
                    label: 'Neurobion',
                    defaultValue: 'Neurobion',
                    disabled: true
                },
                {
                    name: 'campaign week',
                    label: 'Campaign Week',
                    type: 'date'
                }],
                {
                    name: 'separator',
                    label: 'Separator',
                    defaultValue: '-'
                }
            ]
        };

        let google_form = [
            {
                name: 'landing url',
                label: 'Landing URL *',
                validationRules: [
                    'url'
                ]
            },
            [{
                name: 'Source',
                label: 'Source',
                type: 'select',
                options: [
                    { text: 'Facebook', value: 'facebook' },
                    { text: 'Google Ads', value: 'googleads' },
                    { text: 'Email', value: 'email' },
                ],
                defaultValue: 'facebook',
                disabled: true
            },
            {
                name: 'Medium',
                label: 'Medium',
                type: 'select',
                options: [
                    { text: 'Facebook', value: 'facebook' },
                    { text: 'Google Ads', value: 'googleads' },
                    { text: 'Email', value: 'email' },
                ]
            },
            {
                name: 'Goal',
                label: 'Goal',
                type: 'select',
                options: [
                    { text: 'Facebook', value: 'facebook' },
                    { text: 'Google Ads', value: 'googleads' },
                    { text: 'Email', value: 'email' },
                ]
            }],
            [{
                name: 'UTM Campaign Name',
                label: 'UTM Campaign Name'
            },
            {
                name: 'UTM Term',
                label: 'UTM Term',
                type: 'date'
            }]
        ];

        let adobe_form = [
            [{
                name: 'Business_Unit',
                label: 'Business Unit',
                type: 'select',
                options: [
                    { text: 'Consumer Health', value: 'Consumer Health'}
                ],
                defaultValue: 'Consumer Health',
                disabled: true
            },
            {
                name: 'Site_Name',
                label: 'Product',
                type: 'select',
                options: [
                    { text: 'Bion3', value: 'Bion3' },
                    { text: 'Neurobion', value: 'Neurobion' },
                    { text: 'Nasivin', value: 'Nasivin' },
                    { text: 'Femibion', value: 'Femibion' },
                    { text: 'Seven Seas', value: 'Seven Seas' }
                ],
                defaultValue: 'Bion3'
            },
            {
                name: 'Franchise',
                label: 'Creative Type',
                type: 'select',
                options: [
                    { text: 'gif', value: 'gif'},
                    { text: 'image', value: 'image'},
                    { text: 'link', value: 'link'},
                    { text: 'video', value: 'video'}
                ],
                defaultValue: 'gif'
            }],
            {
                name: 'landing url',
                label: 'Landing URL *',
                validationRules: [
                    'url'
                ]
            },
            [{
                name: 'Geographic_Market',
                label: 'Country',
                type: 'select',
                options: [
                    { text: 'Australia', value: 'Australia'},
                    { text: 'Chile', value: 'Chile'},
                    { text: 'France', value: 'France'},
                    { text: 'Germany', value: 'Germany'},
                    { text: 'Great Britain', value: 'Great Britain'},
                    { text: 'Hungary', value: 'Hungary'},
                    { text: 'Poland', value: 'Poland'},
                    { text: 'South Africa', value: 'South Africa'}
                ],
                defaultValue: 'Germany'
            },{
                name: 'Marketing_Channel',
                label: 'Medium',
                type: 'select',
                options: [
                    { text: 'affiliate', value: 'affiliate'},
                    { text: 'banner', value: 'banner'},
                    { text: 'blog', value: 'blog'},
                    { text: 'carouselle', value: 'carouselle'},
                    { text: 'cpc', value: 'cpc'},
                    { text: 'direct', value: 'direct'},
                    { text: 'display', value: 'display'},
                    { text: 'ebook', value: 'ebook'},
                    { text: 'email', value: 'email'},
                    { text: 'feed', value: 'feed'},
                    { text: 'online radio', value: 'online radio'},
                    { text: 'organic ', value: 'organic'},
                    { text: 'paid+influencer', value: 'paid+influencer'},
                    { text: 'partner', value: 'partner'},
                    { text: 'pdf', value: 'pdf'},
                    { text: 'ppc', value: 'ppc'},
                    { text: 'presentation', value: 'presentation'},
                    { text: 'press', value: 'press'},
                    { text: 'print', value: 'print'},
                    { text: 'qr code', value: 'qr code'},
                    { text: 'retargeting', value: 'retargeting'},
                    { text: 'social', value: 'social'},
                    { text: 'tv', value: 'tv'},
                    { text: 'widget', value: 'widget'}
                ],
                defaultValue: 'blog'
            },
            {
                name: 'Platform',
                label: 'Source',
                type: 'select',
                options: [
                    { text: 'bing', value: 'bing'},
                    { text: 'duckduckgo', value: 'duckduckgo'},
                    { text: 'email', value: 'email'},
                    { text: 'event', value: 'event'},
                    { text: 'facebook', value: 'facebook'},
                    { text: 'formsignature', value: 'formsignature'},
                    { text: 'google', value: 'google'},
                    { text: 'instagram', value: 'instagram'},
                    { text: 'linkedin', value: 'linkedin'},
                    { text: 'pandora', value: 'pandora'},
                    { text: 'snapchat', value: 'snapchat'},
                    { text: 'spotify', value: 'spotify'},
                    { text: 'twitter', value: 'twitter'},
                    { text: 'yahoo', value: 'yahoo'},
                    { text: 'youtube', value: 'youtube'}
                ],
                defaultValue: 'google',
            }],
            [{
                name: 'Campaign_Name',
                label: 'Campaign Name',
                transformer: {
                    onChange: 'replacedashes'
                }
            },
            {
                name: 'Partner',
                label: 'Partner',
                type: 'select',
                options: [
                    { text: 'Starcom', value: 'Starcom'},
                    { text: 'Other_agency', value: 'Other_agency'},
                    { text: 'Internal', value: 'Internal'},
                    { text: 'Radii', value: 'Radii'}
                ],
                defaultValue: 'Starcom'
            },
            {
                name: 'Placement_Details',
                label: 'Campaign Term',
                transformer: {
                    onChange: 'replacedashes'
                }
            }],
            [{
                name: 'Behavior_Driven',
                label: 'Goal',
                type: 'select',
                options: [
                    { text: 'Awareness_brand', value: 'Awareness_brand' },
                    { text: 'Awareness_local', value: 'Awareness_local' },
                    { text: 'Awareness_reach', value: 'Awareness_reach' },
                    { text: 'Consideration_engagement', value: 'Consideration_engagement' },
                    { text: 'Consideration_leadgen', value: 'Consideration_leadgen' },
                    { text: 'Consideration_traffic', value: 'Consideration_traffic' },
                    { text: 'Consideration_videoviews', value: 'Consideration_videoviews' },
                    { text: 'Conversion_sales', value: 'Conversion_sales' },
                    { text: 'Conversion_signup', value: 'Conversion_signup' }
                ],
                defaultValue: 'Awareness_brand',
            },
            {
                name: 'Topic_or_CTA',
                label: 'Campaign Content',
                transformer: {
                    onChange: 'replacedashes'
                }
            },
            {
                name: 'Destination',
                label: 'Campaign Start',
                type: 'select',
                options: [
                    { text: '2019_10', value: '2019_10'},
                    { text: '2019_11', value: '2019_11'},
                    { text: '2019_12', value: '2019_12'},
                    { text: '2020_01', value: '2020_01'},
                    { text: '2020_02', value: '2020_02'},
                    { text: '2020_03', value: '2020_03'}
                ],
                defaultValue: '2019_10'
            }]
        ];

        this.state = {
            form: JSON.stringify(adobe_form, null, 4)
        }
    }

    renderForm(){
        try{
            return(
                <CustomFormBuilder
                    form={JSON.parse(this.state.form)}
                    submitButton={{
                        text: 'Get URL',
                        className: 'submit'
                    }}
                    onSubmit={(form) => {
                        axios.post(config.endpoint + 'utm_form', form)
                            .then(res => {
                                console.log(res.data.long_url);
                            })
                    }}
                />
            )
        }catch(e){
            return <p>Invalid form, ensure that the JSON is valid</p>
        }
    }

    handleJsonInput(event){
        this.setState({form: event.target.value})
    }

    render() {
        return (
            <Fragment>
                <Grid container spacing={4} justify="center" alignItems="center">
                    <Grid item>
                        <OrganizationLogo />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Title />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm container>
                    <Information />
                </Grid>
                {this.renderForm()}
            </Fragment>
        );
    }
}

export default UTMForm;