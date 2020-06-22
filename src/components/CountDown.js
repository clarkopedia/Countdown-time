import React, { Component } from 'react'
import moment from 'moment'
import Controls from './Controls'

class CountDown extends Component {
    state = {
        duration: this.getRemainingTime(),
        paused: false
    }

    componentDidMount(){
        this.interval = setInterval(() => {
        this.setState({
            duration: this.getRemainingTime()
        })
        },1000)
    }


    getRemainingTime() {
        // current date
        let now = moment(),

            // year
            year = moment({ year: now.year() + 1 }),

            // difference between the 2
            diff = year.diff(now)

        // because we want to have access to the number of days minutes hours and seconds, we need to convert that result of millisecond to an actual duration.
    // return the duration of the difference
    return moment.duration(diff)
    }

    handlePausedToggle =() => {
        // console.log('clicked);
        // this.setState({
        // paused: !this.state.paused
        // })
    this.setState((prevState, props) => {
        const paused = !prevState.paused

        if (paused) {
            clearInterval(this.interval)
        }
        else {
            this.interval = setInterval(() => {
                this.setState({
                    duration: this.getRemainingTime()
                })
            }, 1000)
        }
        return {paused}
    })
    }

    render() {
        const { duration, paused } = this.state

        return (
            <section className="hero is-dark is-bold has-text-centered is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            New Year Day is coming!
      </h1>
                        <div className="section">
                            <nav class="level">
                                <div class="level-item has-text-centered">
                                    <div>
                                        <p class="heading">Days</p>
                                        <p class="title">{Math.floor(duration.asDays())}</p>
                                    </div>
                                </div>
                                <div class="level-item has-text-centered">
                                    <div>
                                        <p class="heading">Hours</p>
                                        <p class="title">{duration.hours().toString().padStart(2, '0')}</p>
                                    </div>
                                </div>
                                <div class="level-item has-text-centered">
                                    <div>
                                        <p class="heading">Minutes</p>
                                        <p class="title">{duration.minutes().toString().padStart(2, '0')}</p>
                                    </div>
                                </div>
                                <div class="level-item has-text-centered">
                                    <div>
                                        <p class="heading">Seconds</p>
                                        <p class="title">{duration.seconds().toString().padStart(2, '0')}</p>
                                    </div>
                                </div>
                            </nav>

                        </div>
                        <Controls onPaused={paused} onPausedToggle={this.handlePausedToggle}/>
                    </div>
                </div>
            </section>
        )
    }
}

export default CountDown