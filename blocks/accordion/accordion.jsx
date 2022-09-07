
function AccordionItem({ heading, elements }) {
    return (
        <div className={'accordion__item'}>
            <h3 className={'accordion__item-heading'}>{heading}</h3>
            <div className={'accordion__item-container'}>{elements}</div>
        </div>
    )
}

function Accordion({ pannels }) {
    return (
        <div className={'accordion__root'}>
            {pannels.map(props => <AccordionItem {...props} />)}
        </div>
    )
}

export default function decorate(block) {
    const pannels = [...block.children].map(child => ({
        heading: child.querySelector('strong').textContent,
        elements: [...child.children]
    }))
    
    block.replaceWith(<Accordion pannels={pannels} />)
}