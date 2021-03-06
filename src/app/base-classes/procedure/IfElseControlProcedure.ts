import {IProcedure} from "./IProcedure";
import {Procedure} from "./Procedure";
import {ProcedureTypes} from "./ProcedureTypes";
import {IComponent} from "./IComponent";

export class IfElseControlProcedure extends Procedure{

	constructor(title: ProcedureTypes.IfElseControl|ProcedureTypes.IfControl|ProcedureTypes.ElseControl, 
		data ?: {if_condition: string, el_condition: string}){
		
		super(title, true);

		if (title == ProcedureTypes.IfElseControl){
			let if_control: IProcedure = new IfElseControlProcedure( ProcedureTypes.IfControl, data )
			let else_control: IProcedure = new IfElseControlProcedure( ProcedureTypes.ElseControl, data)
			
			super.addChild(if_control);
			super.addChild(else_control);
		}
		else{

			if(title == ProcedureTypes.IfControl){

				if(data == undefined){
					data = {if_condition: undefined, el_condition: undefined}
				}

				let left: IComponent = { 
									 expression: data.if_condition, 
									 isAction: false, 
									 module: undefined, 
									 category: undefined, 
									 fn_name: undefined,
									 params: undefined
								}
				this.setLeftComponent(left)
			}
			else if(title == ProcedureTypes.ElseControl){
				
			}
		}

	}

	addChild(prod: IProcedure): void{
		if(this.getType() == ProcedureTypes.IfElseControl){
			alert("Cannot add child to this");
		}
		else{
			super.addChild(prod);
		}
	}

}
