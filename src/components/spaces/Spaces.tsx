import { Component } from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { User  } from '../../model/Model'

interface SpacesState {
    spaces: Space[],
    showModal: boolean,
    modalContent: string
}

interface SpacesProps {
    dataService: DataService;
    user: User | undefined;
}

export class Spaces extends Component<SpacesProps, SpacesState> {

    constructor(props: SpacesProps) {
        super(props)
        this.state = {
            spaces: [],
            showModal: false,
            modalContent: ''
        }

    }

    async componentDidMount() {
        const spaces = await this.props.dataService.getSpaces();
        this.setState({
            spaces: spaces
        });
    }

    render() {
        return (
            <div>
                <h2>Welcome to the Spaces page!</h2>
            </div>
        )
    }


}