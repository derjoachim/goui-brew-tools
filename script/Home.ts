import {Page} from "./Page.js";
import {btn, code, h2, p} from "@intermesh/goui";

export class Home extends Page {
    constructor() {
        super();
        this.title = "Joachims Brew tools in GOUI";

        this.items.add(

            p( "Click on the menu items in the left margin to use the calculation tools"),
            h2("Written in GOUI"),
            p("GOUI is the new Typescript-based framework for <a href=\"https://www.group-office.com/\" " +
                "target=\"_blank\">Group-Office</a> and is intended to replace the currently used ExtJS 3.4 framework. ")


        )
    }
}