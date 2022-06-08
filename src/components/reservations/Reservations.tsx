import React from "react";
import { Link } from "react-router-dom";
import { Reservation, User } from "../../model/Model";
import { DataService } from "../../services/DataService";
import './Reservations.css';

interface ReservationsState {
    userReservations: Map<string, Reservation>,
    allReservations: Map<string, Reservation>
}
interface ReservationsProps {
    user: User | undefined,
    dataService: DataService
}

export class Reservations extends React.Component<ReservationsProps, ReservationsState> {

    constructor(props: ReservationsProps){
        super(props);
        this.state = {
            userReservations: new Map<string, Reservation>(),
            allReservations: new Map<string, Reservation>()
        }
        // this.cancelReservation = this.cancelReservation.bind(this);
        // this.approveReservation = this.approveReservation.bind(this);
        // this.deleteReservation = this.deleteReservation.bind(this);
    }

    async componentDidMount() {
        const userReservations = await this.props.dataService.getUserReservations();
        this.setState({
            userReservations: new Map(userReservations.map(i=>[i.reservationId, i]))
        });
        if (this.props.user?.isAdmin) {
            const allReservations = await this.props.dataService.getAllReservations();
            this.setState({
                allReservations: new Map(allReservations.map(i=>[i.reservationId, i]))
            });
        }
    }

    private renderUserReservations(){
        const rows: any[] = []
        this.state.userReservations.forEach((reservation) =>{
            rows.push(
                <ReservationComponent
                    key = {reservation.reservationId}
                    reservationId = {reservation.reservationId}
                    spaceId = {reservation.spaceId}
                    state = {reservation.state}
                    user = {reservation.user}
                    cancelReservation = {this.cancelReservation}
                    deleteReservation = {this.deleteReservation}
                />
            )
        })
        return <table>
            <tbody>
                <tr>
                    <th>User</th>
                    <th>SpaceId</th>
                    <th>State</th>
                    <th colSpan={3} >Actions</th>
                </tr>
            {rows}
            </tbody>
        </table>
    }

    private renderAllReservations(){
        if (this.props.user?.isAdmin) {
            const rows: any[] = []
            this.state.allReservations.forEach((reservation) =>{
                rows.push(
                    <ReservationComponent
                        key = {reservation.reservationId}
                        reservationId = {reservation.reservationId}
                        spaceId = {reservation.spaceId}
                        state = {reservation.state}
                        user = {reservation.user}
                    />
                )
            })
            return <div>
                Here are all the reservations, you can handle them: <br></br>
                <table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>SpaceId</th>
                        <th>State</th>
                        <th colSpan={3} >Actions</th>
                    </tr>
                {rows}
                </tbody>
            </table>
            </div>
        } else {
            return undefined
        }
    }

    render(){
        if (this.props.user) {
            return <div>
                Hello {this.props.user.userName}, here are your reservations:<br></br>
                {this.renderUserReservations()}
                {this.renderAllReservations()}
            </div>
        } else {
            return <div>
            Please <Link to='login'>Login</Link>
         </div>
        }
    }
}