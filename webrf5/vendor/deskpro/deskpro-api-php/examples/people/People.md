Search for people matching criteria
-----------------------------------

    $criteria = $api->people->createCriteria();

    $criteria->addName('abhinav')
        ->addAgentTeam(1)
        ->addEmailDomain('abhinavkumar.in')
        ->agentsOnly();

    $result = $api->people->find($criteria);

Create a new person
-------------------

    $newUser = $api->people->createPersonEditor();

    $newUser->setName("User5 with a Password")
        ->setEmail("anotheruser6@test.com")
        ->setPassword('password');

    $result = $api->people->save($newUser);

Get information about a person
------------------------------

    $result = $api->people->findById(16);

Updates a person
----------------

    $edituser = $api->people->createPersonEditor()
        ->setId(16)
        ->setName("User5 with a Password")
        ->setEmail("anotheruser6@test.com")
        ->setPassword('password');

    $result = $api->people->save($edituser);

Deletes a person
----------------

    $result = $api->people->deleteById(15);

Reset a person's password
-------------------------

    $edituser = $api->people->createPersonEditor()
        ->setId(16)
        ->setPassword("newpassword")
        ->sendMail();

    $result = $api->people->save($edituser);

Reset a all active sessions for a person
----------------------------------------

    $result = $api->people->clearPersonSessions(16);

Get a link to a person's profile picture
----------------------------------------

    $result = $api->people->getPersonPicture(16);

Updates a person's profile picture
----------------------------------

    $result = $api->people->setPersonPicture(16, '/path/to/image.jpg');

Deletes a person's profile picture
----------------------------------

    $result = $api->people->deletePicture($personId);

Merges two people.
----------------------------------
`$target` is the ID of the person that the other will be merged into
`$from` is the ID of the person that will be removed on a successful merge

    $result = $api->people->merge($target, $from);

Gets a list of automatically applied SLAs for a person.
----------------------------------

    $result = $api->people->getSlas($personId);

Adds an SLA for a person.
----------------------------------

    $result = $api->people->addSla($personId, $slaId);

Determines if a person has a particular SLA
----------------------------------

    $result = $api->people->getSla($personId, $slaId);

Deletes a particular SLA for a person.
----------------------------------

    $result = $api->people->deleteSla($personId, $slaId);

Gets all emails for a person.
----------------------------------

    $result = $api->people->getEmails($personId);

Adds an email for a person.
----------------------------------
    
    $email      = 'newemail@domain.com'; // The email to add to the person.
    $comment    = 'Work Email'; // An optional comment.
    $setPrimary = TRUE; // Whether to set this email as primary for the person.

    $result = $api->people->addEmail($personId, $email, $comment, $setPrimary);

Gets information about a particular email ID for a person.
----------------------------------
`$emailId` is the record id of email, not the actual email address

    $result = $api->people->getEmail($personId, $emailId);

Updates a particular email ID for a person.
----------------------------------
`$emailId` is the record id of email, not the actual email address

    $comment    = 'Work Email'; // An optional comment.
    $setPrimary = TRUE; // Whether to set this email as primary for the person.

    $result = $api->people->updateEmail($personId, $emailId, $setPrimary, $comment);

Deletes a particular email ID for a person.
----------------------------------
`$emailId` is the record id of email, not the actual email address

    $result = $api->people->deleteEmail($personId, $emailId);

Gets tickets for a person.
----------------------------------
    $page = 2; // Page number of the result set
    $order = 'ticket.date_created:asc'; //Defaults to ticket.date_created:desc.
    $cacheId = '13579'; // the ID of the cache set to use to retrieve cached results

    $result = $api->people->getTickets($personId, $page, $order, $cacheId);

Gets chats for a person.
----------------------------------
    $page = 2; // Page number of the result set
    $order = 'chat_conversations.id:desc'; //Defaults to chat_conversations.id:desc.
    $cacheId = '13579'; // the ID of the cache set to use to retrieve cached results

    $result = $api->people->getChats($personId, $page, $order, $cacheId);

Gets activity stream for a person.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->people->getActivityStream($personId, $page = 1);

Gets notes for a person.
----------------------------------

    $result = $api->people->getNotes($personId);

Creates a note for a person.
----------------------------------

    $note = 'Note Text';
    $result = $api->people->createNote($personId, $note);

Gets billing charges for a person.
----------------------------------

    $page = 2; // page number of the result set
    $result = $api->people->getBillingCharges($personId, $page);

Gets all contact details for a person.
----------------------------------

    $result = $api->people->getContactDetails($personId);

Determines if a particular contact ID exists for a person.
----------------------------------

    $result = $api->people->getContactDetail($personId, $contactId);

Removes a particular contact detail from a person.
----------------------------------

    $result = $api->people->removeContactDetail($personId, $contactId);

Gets the list of groups that the person belongs to.
----------------------------------

    $result = $api->people->getPersonGroups($personId);

Adds a person to a group.
----------------------------------

    $result = $api->people->addToGroup($personId, $groupId);

Determines if the a person is a member of a particular group.
----------------------------------

    $result = $api->people->checkInGroup($personId, $groupId);

Removes a person from a group.
----------------------------------

    $result = $api->people->removeFromGroup($personId, $groupId);

Gets all labels associated with a person.
----------------------------------

    $result = $api->people->getPersonLabels($personId);

Adds a label to a person.
----------------------------------

    $result = $api->people->addPersonLabel($personId, $label);

Determines if a person has a specific label.
----------------------------------

    $result = $api->people->getPersonLabel($personId, $label);

Removes a label from a person.
----------------------------------

    $result = $api->people->removePersonLabel($personId, $label);

Gets a list of custom people fields.
----------------------------------

    $result = $api->people->getPeopleFields();

Gets a list of available user groups.
----------------------------------

    $result = $api->people->getGroups();

