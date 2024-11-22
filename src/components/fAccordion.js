import React, { useState } from 'react'
import { Accordion } from 'flowbite-react';

const FlowbiteAccordion = ({ acctitle, accdescription }) => {

    return (
        <Accordion collapseAll>
            <Accordion.Panel>
                <Accordion.Title>{acctitle}</Accordion.Title>
                <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                    {accdescription}
                </p>
                </Accordion.Content>
            </Accordion.Panel>
        </Accordion>
   )
};

export default FlowbiteAccordion;