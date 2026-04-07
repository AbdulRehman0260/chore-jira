Our users can be created and can login now.
Next, we need the logged in so to be able to create a household successfully.
Create a household and be able to get an invite code randomly and reference the user correctly.
If someone enters an invite code, mongodb will go fetch the household id from the model -> once and if it has one, it will use that household id to fetch the existing membership model
Now that someone is part of the house, they should be able to create a ticket and assign it to the other member of the house
A ticket should have a user that created it, a description of the ticket, the house that the ticket is being created for, the members it can be assigned to and who to assign to, the category of the work item, due date, status of the ticket, points for the ticket, timstamps that are needed.
Create ticket controller
