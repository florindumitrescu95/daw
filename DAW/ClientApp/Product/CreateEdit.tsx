import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Product } from '../models';
import './product.css';
import * as models from '../models';

interface CreateEditState {
    product: Product;
    loading: boolean;
    save: boolean;
}
interface CreateEditProps {
    id: number
    dbaction: string
    onSave?: any 
    pushNewState?: any
}

export class CreateEdit extends React.Component<CreateEditProps, CreateEditState> {
    constructor(props) {
        super(props);
        if (this.props.dbaction == "edit") {
            this.state = {
                product: null,
                loading: true,
                save: false,
            }
			fetch('api/products/' + this.props.id)
                .then(response => response.json() as Promise<Product>)
                .then(data => {
                    this.setState({
                        product: data,
                        loading: false
                    });
                });
        } else
            this.state = {
                product: null,
                loading: false,
                save: false,
            }
    }

    isValidElement = element => {
        return element.name && element.value;
    };

    isValidValue = element => {
        return (['checkbox', 'radio'].indexOf(element.type) == -1 || element.checked);
    };

    formToJson = elements => [].reduce.call(elements, (data, element) => {
        if (this.isValidElement(element) && this.isValidValue(element)) {
            data[element.name] = element.value;
        }
        return data;
    }, {});

    handleSave(e) {
        e.preventDefault()
        let meth: string = (this.props.dbaction == "edit" ? "put" : "post")
        let form: Element = document.querySelector('#frmCreateEdit')
        let id = document.getElementById('Id') as HTMLInputElement

        fetch('api/products/',
            {
                method: meth,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.formToJson(form))
            }).then(data => {
                this.setState({ save: false });
                this.props.onSave(true);
            });
    }

    handleChange(event, state) {
        var newState = this.state.product;
        newState[state] = event.target.value;

        console.log(newState[state]);
        this.setState({ product: newState })
    }

    private renderForm(item: Product) {
        if (this.props.dbaction != "edit")
            item = new Product();
        return <form id="frmCreateEdit">
            
            <label>Name</label>
            <input id="title" name="title" type="text" value={item.title != null ? item.title : ''} onChange={(event) => this.handleChange(event, "title")} />
            <label>Album</label>
            <input id="albumTitle" name="albumTitle" type="text" value={item.albumTitle != null ? item.albumTitle : ''} onChange={(event) => this.handleChange(event, "albumTitle")} />
            <label>Album Description</label>
            <input id="AlbumDescription" name="AlbumDescription" type="text" value={item.albumDescription != null ? item.albumDescription : ''} onChange={(event) => this.handleChange(event, "albumDescription")} />
            <label>Genre</label>
            <input id="gender" name="gender" type="text" value={item.gender != null ? item.gender : ''} onChange={(event) => this.handleChange(event, "gender")}  />
            <label>Price</label>
            <input id="price" name="price" type="text" value={item.price != null ? item.price : ''} onChange={(event) => this.handleChange(event, "price")}  />
            <button onClick={(e) => this.handleSave(e)} >Submit</button>
            </form>
    }

    public render() {
        const { dbaction } = this.props;
        let contents = this.state.loading ?
            <p><em>Loading...</em></p>
            : this.renderForm(this.state.product)

        return <div>
            <h1>{dbaction == "edit" ? "Edit Product" : "Create Product"}</h1>
            {contents}
            </div>
    }
}