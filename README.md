JS Todo list with local storage:

* Can add an item to a 
* Can remove the item from the list 
* Can check an item as completed from the list
* Can filter items betwen all, completed, uncompleted
* Can save a delete items from local storage


--- WORKING ON THIS BRANCH

* Storing items that have been checked under a separate object & key in local storage
* Loading items from local storage (partially working)
  
Issues found:
- The condition over which I load items using the joint function doesn't work all the time (i.e. if the array of checked items is empty for instance)
- the way I re-assign the "completed" toggle is not working as they don't come up in the filter
  