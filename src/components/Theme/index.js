import React from 'react'
import Button from './Button'
import Card from './Card'
import Input from './Input'

const Theme = ({
    nav
}) => {
    return (
        <div className="container p-2">
            <Input placeholder="E-Mail"/>

            <Button 
                icon="white/menu"
                onClick={() => nav.toggle(!nav.open)}/>

            <Button icon="primary/arrow" secondary/>
            <Button icon="black/pin" white/>

            <Card className="mt-2">
                <h1 className="mt-0">Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere nihil corporis velit incidunt at, libero esse, cupiditate fugit perspiciatis ducimus repellendus delectus, consectetur vero! Beatae laudantium non quam recusandae optio.</p>
                <a href="/#">
                    Link
                </a>
                <br/>
                <Button>
                    Read More
                </Button>
                <br/>
                <Button secondary>
                    Details
                </Button>
                <br/>
            </Card>
        </div>
    )
}

export {
    Button,
    Input,
    Card,
}

export default Theme