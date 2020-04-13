JS Todo list with local storage:

## Requirements:
* I want to be able to add an item to the list
* I want to be able to check as done an item I have added to the list
* I want to be able to delete an item I have added (checked or not) from the list
* I want to be able to filter between completed, uncompleted or both
* I want to be able to save to local storage and resume from local storage 

## Design notes

**add item**
Trigger: `class = fas fa-plus-square` on click
Action:
* a new item on the `todoArray` with property `.classList.toggle('uncompleted')`
* storage of updated `todoArray` to local storage

**check item**
Trigger: `class = complete-btn` on click
Action:
* a new item on the `progressArray` with `.classList.toggle('completed')`, 
* delete from todoArray in storage, add to progressArray in local storage

**delete item**
Trigger: `class = trash-btn` on click
Action:
* removal of item from array it belonged to `todoArray` or `progressArray`
* removal of item from local storage it belonged to `progress` or `todo`

**filter items**
Trigger: `classs filter-todo` on change
Action:
* updating `.display` property to `flex` or `none` depending filter condition over `.classList` being met

**loading from local storage**
Trigger: `"DOMContentLoaded"` on load/reload
Action:
* reconstruct list HTML based on local storage 



--- WORKING ON THIS BRANCH

* Storing items that have been checked under a separate object & key in local storage
* Loading items from local storage (partially working)
  
Issues found:
- The condition over which I load items using the joint function doesn't work all the time (i.e. if the array of checked items is empty for instance)
- the way I re-assign the "completed" toggle is not working as they don't come up in the filter
  