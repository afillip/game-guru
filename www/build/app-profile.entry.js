import { r as registerInstance, h } from './core-ed645cd6.js';

const AppProfile = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    normalize(name) {
        if (name) {
            return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
        }
        return '';
    }
    render() {
        if (this.match && this.match.params.name) {
            return (h("div", { class: "app-profile" }, h("p", null, "Hello! My name is ", this.normalize(this.match.params.name), ". My name was passed in through a route param!")));
        }
        else {
            return (h("h1", null, "pickles"));
        }
    }
    static get style() { return ".app-profile {\n  padding: 10px;\n}"; }
};

export { AppProfile as app_profile };
