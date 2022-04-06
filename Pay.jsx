import StipeCheckout from 'react-stripe-StipeCheckout';
import { useState, useEffect } from 'react';

const sKEY = "pk_test_51KfpEpJ60JcOxTcE0zDTlJJ7Tt9SrxLdqBGsndJnJLUn0hsvwx2FghFccZU1faijhLDLTzVfQKiC71kZR0lp8yJ400K4vuQaPT"

const Pay = () => 
{
    const [stripeToken, setStripeToken] = useState(null) 

    const history = useHistory();

    const onToken = (token) => 
    {
        setStripeToken(token);
    }

    useEffect(()=> 
    {
        const makeRequest = async () => {
            try
            {
               const res = await axios.post("http://localhost:5000/api/checkout/payment",
               {
                tokenId: stripeToken.id,
                amount: 2000,
               }
             );

             console.log(res.data);
             history.push("/success",)
            
            }
            catch(err)
            {
                console.log(err)
            }
        }
           
    });

    stripeToken && makeRequest();  
    [stripeToken]

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <StripeCheckout 
            name= "Bites and Bytes Webstore" 
            image= ""
            billingAddress
            descripction = " Your total is £"
            amount = {2000}
            stripeKey = {sKEY}

            >
            <button
                style={{
                    border: "none",
                    width: 120,
                    borderRadius: 5,
                    padding: "20px",
                    backgroundColour: "black",
                    colour: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                }}
            >
                Pay Now
            </button>
            </StripeCheckout>
        </div>
    );
};