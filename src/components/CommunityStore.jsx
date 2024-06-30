import React from 'react';
import Item from './Item';

const Communityitems = ({ items }) => {
    return (
        <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-3">


            {
                items.length > 0 ?
                    items.map((item) => {
                        return (
                            <Item key={item._id} id={item._id} name={item.name} attachmentURL={item.attachmentURL} description={item.description} price={item.price} />
                        )
                    })
                    :
                    <span>There currently no items for sale.</span>
            }

            {
                items.length > 0 ?
                    items.map((item) => {
                        return (
                            <Item key={item._id} id={item._id} name={item.name} attachmentURL={item.attachmentURL} description={item.description} price={item.price} />
                        )
                    })
                    :
                    <span>There currently no items for sale.</span>
            }
            {
                items.length > 0 ?
                    items.map((item) => {
                        return (
                            <Item key={item._id} id={item._id} name={item.name} attachmentURL={item.attachmentURL} description={item.description} price={item.price} />
                        )
                    })
                    :
                    <span>There currently no items for sale.</span>
            }
            {
                items.length > 0 ?
                    items.map((item) => {
                        return (
                            <Item key={item._id} id={item._id} name={item.name} attachmentURL={item.attachmentURL} description={item.description} price={item.price} />
                        )
                    })
                    :
                    <span>There currently no items for sale.</span>
            }

        </div>
    )
}

export default Communityitems