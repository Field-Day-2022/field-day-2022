### US 288 Task 299 : Locations for toe code array domain changes

All FormFields.jsx entries also change the export function to no longer send an array prop with these functions

1. generateNewToeCode() in FormFields.jsx line 629 -- DONE
    - many here; take out DB query to get array list
2. checkToeCodeValidity() in FormFields.jsx line 566 -- DONE
3. const ToeClipCodeField has prop array and some db queries to confirm -- FormFields.jsx line 611

I think these are them for now.. honestly thought there would be more.

Almost undoubtedly I will add more once i actually change the code and I fix functionality. thats all i found so far.
