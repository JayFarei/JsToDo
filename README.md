# JS Todo list with local storage.

A Javascript todo list application that manages the state of a task (from & to checked, delete) and allows for filtering. 
All tasks are stored in local storage.

Colour palette is ispired by [Dracula theme](https://draculatheme.com/).

**Demo:**

![alt](./img/JsToDo.gif)


## Requirements:
* I want to be able to add an item to the list
* I want to be able to check an item I have added to the list
* I want to be able to delete an item I have added (checked or not) from the list
* I want to be able to filter between completed, uncompleted or both
* I want to be able to save to local storage and resume from local storage 

## Design notes

### add item
Trigger: `class = fas fa-plus-square` on click
Action:
* generate HTML of a new item with `.classList` property `uncompleted`
* add item to the `uncompletedArray` in local storage

### check item
Trigger: `class = complete-btn` on click
Action:
* a new item on the `completedArray` with `.classList` property `'completed'`
* delete from todoArray in storage, add to progressArray in local storage
* re-generate HTML item with `restore` button & `'uncompleted'` property

### uncheck item
Trigger: `class = restore-btn` on click
Action:
* regenerate HTML of an item with `uncompleted` status
* remove item from `completedArray` in local storage and add it to `uncompletedArray`


### delete item
Trigger: `class = trash-btn` on click
Action:
* removal of item from array it belonged, either`uncompletedArray` or `completedArray` / discern that using `classList` property
* remove item from HTML doc

### filter items
Trigger: `class filter-todo` on change
Action:
* updating `.display` property to `flex` or `none` depending filter condition over `.classList` being met

### loading from local storage
Trigger: `"DOMContentLoaded"` on load/reload
Action:
* reconstruct list HTML based on local storage including classList properties

