import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import {
    Row,
    Label,
    FormWrapper,
    Wrapper,
    Answer,
    Container,
    BoxWrapper,
    Answers,
} from './styles';
import {
    emailValidation,
    phoneParser,
    wwwValidation,
} from './regex';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <Label>{label}</Label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);


let ContactForm = props => {
    const { handleSubmit } = props
    return (
      <form style={{width: '100%'}} onSubmit={handleSubmit}>
        <FormWrapper>
            <Row>
                <Field
                    name="email"
                    component={renderField}
                    type="text"
                    label="Email Input"
                    validate={emailValidation}
                />
            </Row>
            <Row>
                <Field
                    name="phone"
                    component={renderField}
                    type="text"
                    label="Phone"
                    parse={phoneParser}
                />
            </Row>
            <Row>
                <Field
                    name="www"
                    component={renderField}
                    type="text"
                    label="WWW"
                    validate={wwwValidation}
                />
            </Row>
        </FormWrapper>
      </form>
    )
  }

  ContactForm = reduxForm({
    // a unique name for the form
    form: 'regex'
  })(ContactForm)

class Inputs extends React.Component {
    state = {
        email: '',
        iban: '',
        other: '',
    }

    render() {
        return(
            <Container>
                {console.log(this.props.all)}
                <BoxWrapper>
                    <Wrapper>
                        <ContactForm/>
                    </Wrapper>
                    <Answers>
                        <Row>
                            <Label>Email Output</Label>
                            <Answer>122</Answer>
                        </Row>
                        <Row>
                            <Label>Phone Output</Label>
                            <Answer>122</Answer>
                        </Row>
                        <Row>
                            <Label>WWW Output</Label>
                            <Answer>122</Answer>
                        </Row>
                    </Answers>
                </BoxWrapper>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const all = state.form.regex;
    return ({
        all,
    });
}


export default compose(
    withRouter,
    connect(mapStateToProps),
  )(Inputs);