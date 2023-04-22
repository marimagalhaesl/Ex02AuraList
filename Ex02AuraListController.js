({
    acctsAction : function(component, event, helper) {
        component.set("v.Columns", [
            {label:"Name", fieldName:"Name", type:"text"},
            {label:"Annual Revenue", fieldName:"AnnualRevenue", type:"currency"},
            {label:"Rating", fieldName:"Rating", type:"text"},
            {label:"Created Date", fieldName:"CreatedDate", type:"date"}            
        ]);
        
        var action1 = component.get("c.getAccountsByName");
        
        //Sets the callback function that is executed after an Apex action returns.
        action1.setCallback(this, function(data) {
            
            var state = data.getState();
            if(state === "SUCCESS") {
                component.set("v.accountsListByName", data.getReturnValue());   
            }
            
        });
        
        //The framework uses a stack to keep track of the actions to send to the server. 
        //When the browser finishes processing events and JavaScript on the client, 
        //the enqueued actions on the stack are sent to the server in a batch.
        $A.enqueueAction(action1);
        
        
        var action2 = component.get("c.getAccountsByCreatedDate");
        
        action2.setCallback(this, function(data) {
            var state = data.getState();
            if(state === "SUCCESS") {
                component.set("v.accountsListByCreatedDate", data.getReturnValue());
            }
        });
        
        $A.enqueueAction(action2);
    }
})
