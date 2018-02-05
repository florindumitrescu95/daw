import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as models from '../models';
import * as Modal from 'react-modal';
import { CreateEdit } from './CreateEdit';
import { Details } from './Details';

interface ProductState {
    product: models.Product[]
    loading: boolean
    showCreate: boolean
    showEdit: boolean
    showDetails: boolean
    activeId: number
}

export class Products extends React.Component<RouteComponentProps<{}>, ProductState> {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            loading: true,
            showCreate: false,
            showEdit: false,
            showDetails: false,
            activeId: 0
        };
        fetch('api/products')
            .then(response => response.json() as Promise<models.Product[]>)
            .then(data => {
                this.setState({
                    product: data,
                    loading: false,
                });
            });
    }

    public componentWillMount() {
        this.renderPopup();
    }

    handleCreate() {
        this.setState({ showCreate: true, showDetails: false, showEdit: false })
    }

    handleEdit(id: number) {
        this.setState({ showEdit: true, showDetails: false, showCreate: false, activeId: id })
    }

    handleDetails(id: number) {
        this.setState({ showDetails: true, showCreate: false, showEdit: false, activeId: id })
    }

    handleDelete(id: number) {
        if (!confirm('Esti sigur ca vrei sa stergi chestii?'))
            return
        fetch('api/products/' + id, { method: 'delete' })
            .then(data => {
                this.setState(
                    {
                        product: this.state.product.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
    }

    closeModal() {
        this.setState({ showDetails: false, showCreate: false, showEdit: false });
    }

    handlePopupSave(success: boolean) {
        if (success)
            this.setState({ showCreate: false, showEdit: false });

        fetch('api/products')
            .then(response => response.json() as Promise<models.Product[]>)
            .then(data => {
                this.setState({
                    product: data,
                });
            });
    }

    private renderPopup() {
        if (!this.state.showCreate && !this.state.showDetails && !this.state.showEdit)
            return null;
        return <Modal isOpen={true}
            contentLabel='Crawl'>
            <button onClick={() => this.closeModal()} title="close" className="action">X</button>
            {this.renderPopupContent()}
        </Modal>

    }

    private pushNewState(product: models.Product) {
        var newState = this.state.product;
        newState.push(product);

        this.setState({ product: newState });
    }

    private renderPopupContent() {
        if (this.state.showCreate) {
            return <CreateEdit id={null}
                dbaction="create"
                onSave={this.handlePopupSave.bind(this)} />
        } else if (this.state.showEdit) {
            return <CreateEdit id={this.state.activeId}
                dbaction="edit"
                onSave={this.handlePopupSave.bind(this)} />
        } else if (this.state.showDetails) {
            return <Details id={this.state.activeId} />
        }
    }

    private renderContent(products: models.Product[]) {
        return <table className="table">
            <thead>
                <tr>
                    <th>Singer</th>
                    <th>Genre</th>
                    <th>Album</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product => {
                        return (
                            <tr key={product.id} >
                                <td>{product.title}</td>
                                <td>{product.gender}</td>
                                <td>{product.albumTitle}</td>
                                <td>{product.albumDescription}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button className="action" onClick={(id) => this.handleDelete(product.id)}>Delete</button>
                                    <button className="action" onClick={(id) => this.handleEdit(product.id)}>Edit</button>
                                    <button className="action" onClick={(id) => this.handleDetails(product.id)}>Details</button>
                                </td>
                            </tr>)
                    })
                }
            </tbody>
        </table>;
    }

    public render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> :
            this.renderContent(this.state.product);

        return <div>
            <h1>Music</h1>
            {this.renderPopup()}
            <button className="action" onClick={() => this.handleCreate()}> Create </button>
            {contents}
        </div>
    }

}