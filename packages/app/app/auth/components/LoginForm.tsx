import React from "react";
import { Link } from "blitz";
import login from "../mutations/login";
import { LoginInput, LoginInputType } from "../validations";
import Form, { FORM_ERROR } from "../../reusable-ui/Form";
import LabeledTextField from "../../reusable-ui/LabeledTextField";

type LoginFormProps = {
  onSuccess?: () => void;
};

export const LoginForm = (props: LoginFormProps) => {
  return (
    <div>
      <h1>Login</h1>

      <Form<LoginInputType>
        submitText="Log In"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await login({ email: values.email, password: values.password });
            props.onSuccess && props.onSuccess();
          } catch (error) {
            if (error.name === "AuthenticationError") {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " +
                  error.toString(),
              };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
