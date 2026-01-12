export const CityStyles = () => {
    return (
        <style>
            {`
            .neumorph {
                --clr-1: hsl(260, 35%, 12%);
                --clr-2: hsl(197, 100%, 7%);
                --clr-3: hsl(197, 80%, 5%);

            .container {
                    border-radius: 5px;
                    background: var(--clr-3);
                    box-shadow:  5px 5px 0px var(--clr-1),
                                -5px -5px 0px var(--clr-2);
                    }
                .card-up {
border-radius: 8px;
background: linear-gradient(145deg, var(--clr-2), var(--clr-3));
box-shadow:  5px 5px 0px var(--clr-1),
             -5px -5px 0px var(--clr-2);
             }
             .card-down {
    border-radius: 8px;
background: linear-gradient(145deg, var(--clr-1), var(--clr-2));
box-shadow:  5px 5px 0px var(--clr-1),
             -5px -5px 0px var(--clr-2);
             }
        
            .card-normal {
            border-radius: 8px;
background: var(--clr-3);
box-shadow:  5px 5px 0px var(--clr-1),
             -5px -5px 0px var(--clr-2);
            }  
            
            }


            .container {
            width: 90%;
            padding: 0;
            margin: 0 auto;
            background: transparent;
            border: 2px solid red;
                    border-radius: 5px;
                    background: transparent;
                    box-shadow:  5px 5px 0px var(--clr-1),
                                -5px -5px 0px var(--clr-2);
                    }
        
.glass-card {
background: rgba(0, 5, 15, 0.95);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(12.1px);
-webkit-backdrop-filter: blur(12.1px);
border: 1px solid rgba(0, 5, 15, 1);
}

          `}
        </style>
    );
};
