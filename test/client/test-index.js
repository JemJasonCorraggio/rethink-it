import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import {Provider} from "react-redux";

const should = chai.should();


import Triggers from "../../client/js/Components/triggers";
import Thought from "../../client/js/Components/thought";
import Rethought from "../../client/js/Components/rethought";
import Login from "../../client/js/Components/login";
import Form from "../../client/js/Components/form-container";
import List from "../../client/js/Components/list";
import {ListContainer} from "../../client/js/Components/list-container";
import store from "../../client/js/store";


describe("Triggers component", function() {
    it("Renders triggers in edit mode",  function() {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Triggers mode="edit" triggers="insert triggers here" />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("triggers");

        const p = result.props.children[0];
        p.type.should.equal("p");
        const textarea = result.props.children[1];
        textarea.type.should.equal("textarea");
        
    });
    it("Renders triggers in standard mode",  function() {
        const renderer = TestUtils.createRenderer();
         renderer.render(<Triggers mode="standard" triggers="insert triggers here" />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("triggers");

        const p = result.props.children;
        p.type.should.equal("p");
        
    });
});
describe("Thought component", function() {
    it("Renders thought in edit mode",  function() {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Thought mode="edit" thought="insert thought here" />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("thought");

        const p = result.props.children[0];
        p.type.should.equal("p");
        const textarea = result.props.children[1];
        textarea.type.should.equal("textarea");
        
    });
    it("Renders thought in standard mode",  function() {
        const renderer = TestUtils.createRenderer();
         renderer.render(<Thought mode="standard" thought="insert thought here" />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("thought");

        const p = result.props.children;
        p.type.should.equal("p");
        
    });
});
describe("Rethought component", function() {
    it("Renders rethought in edit mode",  function() {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Rethought mode="edit" rethought="insert rethought here" />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("rethought");

        const p = result.props.children[0];
        p.type.should.equal("p");
        const textarea = result.props.children[1];
        textarea.type.should.equal("textarea");
        
    });
    it("Renders rethought in standard mode",  function() {
        const renderer = TestUtils.createRenderer();
         renderer.render(<Rethought mode="standard" rethought="insert rethought here" />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("rethought");

        const p = result.props.children;
        p.type.should.equal("p");
        
    });
});
describe("Form component", function() {
    it("Renders form in edit mode",  function() {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Form mode="edit" triggers= "insert triggers here" thought= "insert thought here" rethought="insert rethought here" />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("form");

        const triggers = result.props.children[0];
        triggers.type.should.equal(Triggers);
        const thought = result.props.children[1];
        thought.type.should.equal(Thought);
        const p1 = result.props.children[2];
        p1.type.should.equal("p");
        const p2 = result.props.children[3];
        p2.type.should.equal("p");
        const p3 = result.props.children[4];
        p3.type.should.equal("p");
        const p4 = result.props.children[5];
        p4.type.should.equal("p");
        const p5 = result.props.children[6];
        p5.type.should.equal("p");
        const p6 = result.props.children[7];
        p6.type.should.equal("p");
        const rethought = result.props.children[8];
        rethought.type.should.equal(Rethought);
        const button = result.props.children[9];
        button.type.should.equal("button");
        
    });
    it("Renders form in standard mode",  function() {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Form mode="standard" triggers= "insert triggers here" thought= "insert thought here" rethought="insert rethought here" />);
        const result = renderer.getRenderOutput();
         result.props.className.should.equal("form");

        const triggers = result.props.children[0];
        triggers.type.should.equal(Triggers);
        const thought = result.props.children[1];
        thought.type.should.equal(Thought);
        const rethought = result.props.children[2];
        rethought.type.should.equal(Rethought);
        const button = result.props.children[3];
        button.type.should.equal("button");
        
    });
});
describe("List component", function() {
    it("Renders a list of forms",  function() {
        const forms = [{mode:"edit", triggers:"triggers", thought:"thought", rethought:"rethought"}, {mode:"edit", triggers:"triggers", thought:"thought", rethought:"rethought"}];
        const renderer = TestUtils.createRenderer();
        renderer.render(<List content = {forms} />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("list");

        const form1 = result.props.children[0][0];
        form1.type.should.equal(Form);
        const form2 = result.props.children[0][1];
        form2.type.should.equal(Form);
        const button = result.props.children[1];
        button.type.should.equal("button");
        
    });
});
describe("Login component", function() {
    it("Renders a login form",  function() {
       const renderer = TestUtils.createRenderer();
        renderer.render(<Login />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("login");

        const form = result.props.children;
        form.type.should.equal("form");
        const input1 = form.props.children[0];
        input1.type.should.equal("input");
        const input2 = form.props.children[1];
        input2.type.should.equal("input");
        
    
        
    });
});
describe("List Containter component", function() {
    it("Renders the page with a list of forms when one is logged in",  function() {
        const forms = [{mode:"edit", triggers:"triggers", thought:"thought", rethought:"rethought"}, {mode:"edit", triggers:"triggers", thought:"thought", rethought:"rethought"}];
        const renderer = TestUtils.createRenderer();
        renderer.render(<ListContainer login = {true} content = {forms} />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("list-container");

        
        
        const list = result.props.children;
        list.type.should.equal(List);
        
    });
     it("Renders the page with login and sign up options when one is not logged in",  function() {
        const forms = [{mode:"", triggers:"", thought:"", rethought:""}];
        const renderer = TestUtils.createRenderer();
        renderer.render(<ListContainer login = {false} content = {forms} />);
        const result = renderer.getRenderOutput();
        result.props.className.should.equal("list-container");

        
        const p = result.props.children[0];
        p.type.should.equal("p");
        const login1 = result.props.children[1];
        login1.type.should.equal(Login);
        const button1 = result.props.children[2];
        button1.type.should.equal("button");
        const newp = result.props.children[3];
        newp.type.should.equal("p");
        const triggers = result.props.children[4];
        triggers.type.should.equal(Triggers);
        const thought = result.props.children[5];
        thought.type.should.equal(Thought);
        const p1 = result.props.children[6];
        p1.type.should.equal("p");
        const p2 = result.props.children[7];
        p2.type.should.equal("p");
        const p3 = result.props.children[8];
        p3.type.should.equal("p");
        const p4 = result.props.children[9];
        p4.type.should.equal("p");
        const p5 = result.props.children[10];
        p5.type.should.equal("p");
        const p6 = result.props.children[11];
        p6.type.should.equal("p");
        const rethought = result.props.children[12];
        rethought.type.should.equal(Rethought);
        const p7 = result.props.children[13];
        p7.type.should.equal("p");
        const login2 = result.props.children[14];
        login2.type.should.equal(Login);
        const button2 = result.props.children[15];
        button2.type.should.equal("button");
        
        
    });
});