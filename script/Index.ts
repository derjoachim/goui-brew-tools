
import {cards, menu, comp, h2, root, router, btn, Component, splitter} from "@intermesh/goui";
import {Home} from "./Home.js";
import {Sg} from "./Sg.js";
import {Abv} from "./Abv.js";
import {NotFound} from "./NotFound.js";

const main = cards({"cls": "main scroll", flex: 1});

const mainMenu = menu(
	{cls: "main"},
	comp({cls: "hbox"},
		h2({text:"Brew", style: { padding: "0", margin: "0", alignSelf: "center"}})),

	btn({
		text: "Home",
		route: ""
	}),

	btn({
		text: "Calculate SG",
		route:"sg"
	}),

	btn({
		text: "Calculate ABV",
		route:"abv"
	})
);


/**
 * To make it memory efficient we will instantiate page components on demand when the router navigates.
 * @param cmp
 */
const pageLoader = (cmp:typeof Component) => {
	const id = router.getPath() || "home";
	let page = main.findItem(id) as Component | undefined;
	if(!page) {
		page = new cmp;
		page.id = id;

		main.items.add(page);
	}

	page.show();

	return page;
}

/**
 * Setup routes
 */
router
	.add(/^$/, () => {
		pageLoader(Home);
	})
	.add(/^sg$/, () => {
		pageLoader(Sg);
	})
	.add(/^abv$/, () => {
		pageLoader(Abv);
	})
	.add(() => {
		pageLoader(NotFound);
	})
	.start()
	.then(() => {
		/**
		 * Use hbox layout to put menu and section side by side
		 */
		root.cls = 'hbox';
		root.items.add(mainMenu, splitter({
			resizeComponentPredicate: mainMenu
		}), main);
	});

