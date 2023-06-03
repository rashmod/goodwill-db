# FRONTEND

-   data visualization

## UI/LoadMoreButton

-   handle errors

## components/ClientForm

-   unit in area input
-   display error msg when submit fails
-   budget field resets the caret position on editing the field
-   check grid spacing in mobile view
-   handle other input fields of other property type than residential
-   should size field accept spaces?? eg. 1 BHK
-   when property will be available

## hooks/useValidateForm

-   recheck logic if it needs change in validateFunc (leadAgentName)

## features/ClientSlice

-   redux state for pagination filter and search

# BACKEND

## Controllers/ClientController

-   budget filter between some range
-   authentication and authorization
-   add author model
-   join author and client model

## Utilities/apiFeatures

-   optimize the search function
