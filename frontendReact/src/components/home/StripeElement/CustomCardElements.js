import { CardCvcElement, CardNumberElement, CardExpiryElement } from "@stripe/react-stripe-js";
import styled from "styled-components";
const CardInputWrapper = styled.div`
    background-color: #2D303E;
    border-radius: 8px;
    border: 1px solid #393C49;
    padding: 12px 15px;
    color: #fff;
`;
const styles = {
    fontSize: '13px',
    color: '#fff',
    fontFamily: 'Arial',
    '::placeholder': {
        color: '#ABBBC2',
    },
}
const CustomCardCvc = () => {
    return (
        <CardInputWrapper>
            <CardCvcElement
                options={{
                    style: {
                        base: styles,
                    },
                }}
            />
        </CardInputWrapper>
    );
}
const CustomCardNumber = () => {
    return (
        <CardInputWrapper>
            <CardNumberElement
                options={{
                    style: {
                        base: styles,
                    },
                }}
            />
        </CardInputWrapper>
    );
}
const CustomExpiry = () => {
    return (
        <CardInputWrapper>
            <CardExpiryElement
                options={{
                    style: {
                        base: styles,
                    },
                }}
            />
        </CardInputWrapper>
    );
}
export { CustomCardCvc,CustomCardNumber,CustomExpiry }