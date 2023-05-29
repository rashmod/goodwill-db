# FRONTEND

## components/ClientForm

-   unit in area input
-   display error msg when submit fails
-   budget field resets the caret position on editing the field
-   edit dealStatus on update

## hooks/useValidateForm

-   recheck logic if it needs change in validateFunc (leadAgentName)
-   add dealStatus validation to valueChangeHandler and validateFunc

# BACKEND

## Controllers/ClientController

-   filters and search
-   add pagination
-   authentication and authorization
-   add author model
-   join author and client model

## Validation/FormValidation

-   add dealStatus validation
