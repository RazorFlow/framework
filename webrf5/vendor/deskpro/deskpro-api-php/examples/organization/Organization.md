Search for organizations matching criteria
-----------------------------------

    $criteria = $api->organizations->createCriteria();

    $criteria->addName('deskpro ltd')
            ->addAddress('address goes here')
            ->addCustomField('custom field key', 'custom field value');

    $result = $api->organizations->find($criteria);

Create a new organization
-----------------------------------

    $newUser = $api->organizations->createOrganizationEditor();

    $newUser->setName('DeskPRO Ltd')
        ->addCustomField('custom field key', 'custom field value')
        ->addToGroup($groupId)
        ->setSummary('Summary text goes here');

    $result = $api->organizations->save($newUser);

Get information about an organization
-----------------------------------

    $result = $api->organizations->findById($organizationId);

Updates an organization
-----------------------------------

    $edituser = $api->organizations->createPersonEditor()
        ->setId($organizationId)
        ->setName("New Name of the Organization");

    $result = $api->organizations->save($edituser);

Deletes an organization
-----------------------------------

    $result = $api->organizations->deleteById(15);

Reset an organization's password
-----------------------------------

    $edituser = $api->organizations->createPersonEditor()
        ->setId($organizationId)
        ->setPassword("newpassword")
        ->sendMail();

    $result = $api->organizations->save($edituser);

Get a link to an organization's profile picture
----------------------------------------

    $result = $api->organizations->getPicture($organizationId);

Updates an organization's profile picture
----------------------------------

    $result = $api->organizations->setPicture($organizationId, '/path/to/image.jpg');

Deletes an organization's profile picture
----------------------------------

    $result = $api->organizations->deletePicture($organizationId);

Gets all SLAs for an organization.
----------------------------------

    $result = $api->organizations->getSlas($organizationId);

Adds an SLA for an organization.
----------------------------------

    $result = $api->organizations->addSla($organizationId, $slaId);

Determines if an organization has a particular SLA
----------------------------------

    $result = $api->organizations->getSla($organizationId, $slaId);

Deletes an SLA for an organization.
----------------------------------

    $result = $api->organizations->deleteSla($organizationId, $slaId);

Gets all contact details for an organization.
----------------------------------

    $result = $api->organizations->getContactDetails($organizationId);

Determines if a particular contact ID exists for an organization.
----------------------------------

    $result = $api->organizations->getContactDetail($organizationId, $contactId);

Removes a particular contact detail from an organization.
----------------------------------

    $result = $api->organizations->removeContactDetail($organizationId, $contactId);

Gets the list of groups that the organization belongs to.
----------------------------------

    $result = $api->organizations->getGroupsByOrganization($organizationId);

Adds an organization to a group.
----------------------------------

    $result = $api->organizations->addGroup($organizationId, $groupId);

Determines if the an organization is a member of a particular group.
----------------------------------

    $result = $api->organizations->getGroup($organizationId, $groupId);

Removes an organization from a group.
----------------------------------

    $result = $api->organizations->removeGroup($organizationId, $groupId);

Gets all labels associated with an organization.
----------------------------------

    $result = $api->organizations->getLabels($organizationId);

Adds a label to an organization.
----------------------------------

    $result = $api->organizations->addLabel($organizationId, $label);

Determines if an organization has a specific label.
----------------------------------

    $result = $api->organizations->getLabel($organizationId, $label);

Removes a label from an organization.
----------------------------------

    $result = $api->organizations->removeLabel($organizationId, $label);

Gets a list of custom organizations fields.
----------------------------------

    $result = $api->organizations->getFields();

Gets a list of available user groups.
----------------------------------

    $result = $api->organizations->getGroups();

Gets members of an organization.
----------------------------------
    $page = 2; // Page number of the result set
    $order = 'person.name:desc'; //Defaults to person.name:asc.
    $cacheId = '13579'; // the ID of the cache set to use to retrieve cached results

    $result = $api->organizations->getMembers($organizationId, $page, $order, $cacheId);

Gets tickets for an organization.
----------------------------------
    $page = 2; // Page number of the result set
    $order = 'ticket.date_created:asc'; //Defaults to ticket.date_created:desc.
    $cacheId = '13579'; // the ID of the cache set to use to retrieve cached results

    $result = $api->organizations->getOrganizationTickets($organizationId, $page, $order, $cacheId);

Gets chats for an organization.
----------------------------------
    $page = 2; // Page number of the result set
    $order = 'chat_conversations.id:asc'; //Defaults to chat_conversations.id:desc.
    $cacheId = '13579'; // the ID of the cache set to use to retrieve cached results

    $result = $api->organizations->getOrganizationChats($organizationId, $page, $order, $cacheId);

Gets activity stream for an organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->getOrganizationActivityStream($organizationId, $page);

Gets billing charges for an organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->getOrganizationBillingCharges($organizationId, $page);

Gets email domains for an organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->getOrganizationEmailDomains($organizationId);

Add email domain for an organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->addOrganizationEmailDomains($organizationId, $domain);

Determines if email domain exists for an organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->addOrganizationEmailDomain($organizationId, $domain);

Deletes an email domain for an organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->deleteOrganizationEmailDomain($organizationId, $domain);

Moves email domain users for an organization if they have no organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->moveOrganizationEmailDomainUsers($organizationId, $domain);

Moves email domain users for an organization if they have an organization.
----------------------------------
    $page = 2; // Page number of the result set

    $result = $api->organizations->moveOrganizationEmailDomainUsers($organizationId, $domain);

