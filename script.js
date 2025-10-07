class ShoppingList {
	constructor() {
		this.button = document.getElementById("enter");
		this.input = document.getElementById("userInput");
		this.list = document.getElementById("myList");

		this.init();
	}

	init() {
		// Validate elements exist
		if (!this.button || !this.input || !this.list) {
			console.error('Required DOM elements not found');
			return;
		}

		this.setupEventListeners();
		this.initializeExistingItems(); 
	}

	setupEventListeners() {
		this.button.addEventListener("click", () => this.addListAfterClick());
		this.input.addEventListener("keydown", (e) => this.addListAfterKeyDown(e));
		this.list.addEventListener("click", (e) => this.handleListClick(e));
	}

	inputLength() {
		return this.input.value.trim().length;
	}

	createListElement() {
		const li = document.createElement("li");
		li.textContent = this.input.value.trim();

		this.addDeleteButton(li);
		this.list.appendChild(li);
		this.input.value = "";
	}

	addListAfterClick() {
		if (this.inputLength() > 0) {
			this.createListElement();
		}
	}

	addListAfterKeyDown(event) {
		if (this.inputLength() > 0 && event.key === "Enter") {
			this.createListElement();
		}
	}

	addDeleteButton(listItem) {
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className = "delete-btn";
		listItem.appendChild(deleteButton);
	}

	handleListClick(event) {
		const target = event.target;

		if (target.classList.contains('delete-btn')) {
			target.parentElement.remove();
		} else if (target.tagName === 'LI') {
			target.classList.toggle("done");
		}
	}

	initializeExistingItems() {
		const existingItems = this.list.querySelectorAll("li");
		existingItems.forEach( item => {
			// Add the delelte button if it doesn't already have one
			if (!item.querySelector('.delete-btn')) {
				this.addDeleteButton(item);
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new ShoppingList;
});