grep -nEr '\/(slidetype|datalayer|quiz)\/' slide | grep -v mediator
grep -nEr '\/(slidetype|datalayer|slide)\/' quiz | grep -v mediator
grep -nEr '\/(slidetype|quiz|slide)\/' datalayer | grep -v mediator
grep -nEr '\/(datalayer|quiz|slide)\/' slidetype | grep -v mediator
