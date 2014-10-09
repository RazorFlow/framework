Contact Data can be added to People and Organizations. In order to simplify the
process of building a contact data for an entity(People or Organization), we have
introduced a ContactData builder.

Adding an Address to a Person
---------------------------------------

    $personBuilder = $api->people->createPersonEditor();

    $contactData = new DeskPRO\Builder\ContactData();

    $address    = 'Address line 1';
    $city       = 'Kolkata';
    $state      = 'West Bengal';
    $country    = 'India';
    $comment    = 'Added by API';

    $contactData->addAddress($address, $city, $state, $country, $comment);

    $personBuilder->setId($personId)->addContactData($contactData);

    $result = $api->people->save($personBuilder);

Adding an Address to an Organization
---------------------------------------

    $organizationBuilder = $api->organization->createOrganizationEditor();

    $contactData = new DeskPRO\Builder\ContactData();

    $address    = 'Address line 1';
    $city       = 'Kolkata';
    $state      = 'West Bengal';
    $country    = 'India';
    $comment    = 'Added by API';

    $contactData->addAddress($address, $city, $state, $country, $comment);

    $organizationBuilder->setId($organizationId)->addContactData($contactData);

    $result = $api->organization->save($organizationBuilder);

Adding a Twitter account
---------------------------------------

    $organizationBuilder = $api->organization->createOrganizationEditor();

    $contactData = new DeskPRO\Builder\ContactData();

    $twitterUsername    = 'deskpro';
    $comment            = 'Added by API';

    $contactData->addTwitter($twitterUsername, $comment);

    $organizationBuilder->setId($organizationId)->addContactData($contactData);

    $result = $api->organization->save($organizationBuilder);

Adding a Skype account
---------------------------------------

    $organizationBuilder = $api->organization->createOrganizationEditor();

    $contactData = new DeskPRO\Builder\ContactData();

    $skypeUsername  = 'deskpro';
    $comment        = 'Added by API';
    
    $contactData->addSkype($skypeUsername, $comment);

    $organizationBuilder->setId($organizationId)->addContactData($contactData);

    $result = $api->organization->save($organizationBuilder);

Adding a Facebook account
---------------------------------------

    $organizationBuilder = $api->organization->createOrganizationEditor();

    $contactData = new DeskPRO\Builder\ContactData();

    $facebookProfileUrl = 'https://www.facebook.com/deskpro';
    $comment            = 'Added by API';

    $contactData->addFacebook($facebookProfileUrl, $comment);

    $organizationBuilder->setId($organizationId)->addContactData($contactData);

    $result = $api->organization->save($organizationBuilder);