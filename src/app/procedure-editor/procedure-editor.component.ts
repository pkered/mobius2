import { Component, Injector, OnInit } from '@angular/core';
import { Viewer } from '../classes/Viewer';
import { IGraphNode } from '../classes/IGraphNode';
import { IProcedure, Procedure, ProcedureFactory } from '../classes/IProcedure';

@Component({
  selector: 'app-procedure-editor',
  templateUrl: './procedure-editor.component.html',
  styleUrls: ['./procedure-editor.component.scss']
})
export class ProcedureEditorComponent extends Viewer {

	private _prodFactory: ProcedureFactory = new ProcedureFactory(); 

  	_procedureArr: IProcedure[] = [];
  	_node: IGraphNode;

  	_tree = [];
	_tree_options = {
	  allowDrag: true,
	  allowDrop:  (element, { parent, index }) => {
	    // return true / false based on element, to.parent, to.index. e.g.
	    return  (parent.data.type === "Control" || parent.hasChildren);
	  }
	};

	constructor(injector: Injector){  super(injector); }

	expandAll(tree){
		tree.treeModel.expandAll();
	}

	updateProcedureTree(){

		let getTreeItem = function(data : IProcedure): any{

			let procedure_type = data.getTitle();
			let dataObj = { id: Math.random() , name: data.getTitle(), type: data.getTitle(), model: data } ; 
			
			if(procedure_type === "Data"){
				
			}
			else if(procedure_type == "Action"){
				dataObj.name = data.getCategory() + "::" + data.getMethod();
			}
			else if(procedure_type == "Control"){
				dataObj.name = data.getControlType();
				dataObj["children"] = data.getNodes().map(function(node){
					return getTreeItem(node)
				})
			}
			else{
				throw Error("unknown procedure type");
			}
			
			return dataObj;
		}

		this._tree = this._procedureArr.map(function(prod, index){
			return getTreeItem(prod);
		})

	}

	update(){
		this._node = this.flowchartService.getSelectedNode();
		this._procedureArr = this._node.getProcedure();
		this.updateProcedureTree();
	}

	addVariable():void{
		// create the procedure
		let prod:IProcedure = this._prodFactory.getProcedure({ id: this._procedureArr.length, title: "Data" });
		this._node.addProcedureLine(prod);

		// data name
		// data value

		this.update();		
	}

	addAction(): void{

	}

	addControl(type: string):void{
		// create the procedure
		let prod:IProcedure = this._prodFactory.getProcedure({ id: this._procedureArr.length, title: type, dataName: "Enter a name...", dataValue: "Enter a value..." });
		this._node.addProcedureLine(prod);
		this.update();		
	}

	// todo:
	disableProcedure(prod: IProcedure): void{
		prod.toggleDisabled();
		this.update();
	}

	deleteProcedure(index: number): void{
		this._node.removeProcedureLine(index);
		this.flowchartService.update();
	}

}
