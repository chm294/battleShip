# Battle Ship Board Game

#### instructions
- cd into makeBattleShipBoard.js  
- in terminal: 'node madeBattleShipBoard.js' to run

#### implementation
- everything in makeBattleShipBoard file is wrapped in an IIFE function to maintain a closed scope
- the main function invokes two things. 
  - First it generates the empty board
  - then placeShips, which loops through the ships object to find every single possible placement option of that ship on the board (using helper function *findAllOptions*) and pushes them into an array
    - placeShips then invokes toggleShip and toggles the ship onto the board before placeShips moves on to doing the same for the next ship

#### Other Considerations
- another way to implement this is by a trial and error method. Instead of exploring every possibility of how each ship fits in each spot on the board, you pick a spot by random, try to see how many directions the ship can fit (up right left down) and then randomly select an orientation. If it does not fit or does not find an open spot, rerun the function to try again. To avoid timing out, set a counter for each time a ship conflicts on the board. If the counter exceeds a certain amount, throw an error saying the board is too small. 

This implementation would have a much less expensive run-time, but is also prone to failing by chance and pure luck.

Although my implementation is more time expensive, it is more robust. And since the board only needs to be made once at the beginning of each game, it seems worth the slightly longer wait. 