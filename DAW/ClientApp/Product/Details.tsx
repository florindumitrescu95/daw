import * as React from 'react';
import * as models from '../models';

interface DetailsState {
    product: models.Product;
    loading: boolean;
}

interface DetailsProps {
    id: number
}

export class Details extends React.Component<DetailsProps, DetailsState>{
    constructor(props) {
        super(props);

        this.state = {
            product: null,
            loading: true
        }

        fetch('api/products/' + this.props.id)
            .then(response => response.json() as Promise<models.Product>)
            .then(data => {
                this.setState({
                    product: data,
                    loading: false
                });
            });
    }

    renderDetails(product) {
        return <div>
                <label>Id</label>
                <div>{product.id}</div>
                <label>Genre</label>
                <div>{product.gender}</div>
                <label>Price</label>
                <div>{product.price}</div>
                <label>Title</label>
                <div>{product.title}</div>
                <label>Album Title</label>
                <div>{product.albumTitle}</div>
                <label>Album Description</label>
                <div>{product.albumDescription}</div>
            </div>
    }

    public render() {
        let contents = this.state.loading ?
            <p><em>Loading...</em></p> :
            this.renderDetails(this.state.product);

        return <div>
            <h1>Info</h1>
            {contents}
        </div>
    }

}