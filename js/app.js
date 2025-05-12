const btnSearch = document.getElementById("search");
const filterPage = document.getElementById("filter-page");
const sectionWrapper = document.querySelector(".feedback-wrapper");
const filterSort = document.getElementById("filter-sort");
let url = "http://51.38.232.174:3002/v1/feedbacks";

async function getFeedBack() {
	const res = await fetch(url, { method: "GET" });
	const data = await res.json();

	console.log(data);
}

getFeedBack() 

function createContainer(classAdd = "", idAdd = "", type) {
	const element = document.createElement(type);
	if (classAdd) element.className = classAdd;
	if (idAdd) element.id = idAdd;
	return element;
}

function createText(classAdd = "", idAdd = "", type, text) {
	const element = document.createElement(type);
	if (classAdd) element.className = classAdd;
	element.textContent = text;
	if (idAdd) element.id = idAdd;

	return element;
}

function createPage(title, desc, vote, category, comment) {
	const divItem = createContainer("feedback-item", "", "div");

	const divVote = createContainer("feedback-item-votes", "", "div");
	divVote.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path
                d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
                style="fill: currentcolor"
            ></path>
        </svg>
    `;

	const spanVotes = createText("text-regular-3", "", "span", vote);

	const divText = createContainer("feedback-item-text", "", "div");

	const h3 = createText("heading-3", "", "h3", title);

	const p = createText("", "", "p", desc);

	const divchip = createText("feedback-chip text-regular-3", "", "div", category);

	const divComment = createContainer("feedback-item-comments", "", "div");

	divComment.innerHTML = `
        <svg class="grey-lighten-1-text" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z"
            ></path>
        </svg>
    `;

	const spanNbrComment = createText("bold", "", "span", comment);

	divItem.appendChild(divVote);
	divVote.appendChild(spanVotes);
	divItem.appendChild(divText);
	divText.appendChild(h3);
	divText.appendChild(p);
	divText.appendChild(divchip);
	divItem.appendChild(divComment);
	divComment.appendChild(spanNbrComment);

	return divItem;
}

window.addEventListener("DOMContentLoaded", async () => {
	const res = await fetch(url, { method: "GET" });
	const data = await res.json();

	for (let i = 0; i < data.length; i++) {
		const dataAll = data[i];
		const myPage = createPage(
			dataAll.title,
			dataAll.description,
			dataAll.votes,
			dataAll.category,
			dataAll.comments
		);

		sectionWrapper.appendChild(myPage);
	}
});

btnSearch.addEventListener("click", async (e) => {
	e.preventDefault();

	sectionWrapper.innerHTML = "";

	let urlFinal = url;

	if (filterSort.value == "upvotes") {
		urlFinal += "?sort=upvotes";
	}
	console.log(url);

	const res = await fetch(urlFinal, { method: "GET" });
	const data = await res.json();

	for (let i = 0; i < filterPage.value; i++) {
		const dataAll = data[i];
		const myPage = createPage(
			dataAll.title,
			dataAll.description,
			dataAll.votes,
			dataAll.category,
			dataAll.comments
		);

		sectionWrapper.appendChild(myPage);
	}
});
