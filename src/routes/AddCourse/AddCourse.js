import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoursesContext from '../../components/context/CoursesContext';
import config from '../../config';
import TokenService from '../../services/token-service'
import NumericInput from 'react-numeric-input';
import './AddCourse.css'

const Required = () => (
    <span className='AddCourse_required red'>*</span>
)

class AddCourse extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func,
        }).isRequired,
    };

    static contextType = CoursesContext;

    state = {
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault()

        // get the form fields from the event
        const { instructor_name, program_area, course_number,
            course_name, quarter, project_id, 
            q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, notes } = e.target;

        const course = {
            instructor_name: instructor_name.value,
            program_area: program_area.value,
            course_number: course_number.value,
            course_name: course_name.value,
            quarter: quarter.value, 
            project_id: project_id.value,
            q1: q1.value, 
            q2: q2.value, 
            q3: q3.value, 
            q4: q4.value, 
            q5: q5.value, 
            q6: q6.value, 
            q7: q7.value, 
            q8: q8.value, 
            q9: q9.value, 
            q10: q10.value,
            notes: notes.value,
        }
        this.setState({ error: null })

        fetch(config.API_ENDPOINT + `/courses`, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                instructor_name.value = ''
                program_area.value = ''
                course_number.value = ''
                course_name.value = ''
                quarter.value = ''
                project_id.value = ''
                q1.value = ''
                q2.value = '' 
                q3.value = '' 
                q4.value = '' 
                q5.value = '' 
                q6.value = ''
                q7.value = '' 
                q8.value = '' 
                q9.value = '' 
                q10.value = ''
                notes.value = ''
                this.context.addCourse(data)
                this.props.history.push('/courselist')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/courselist')
    }

    render() {
        const { error } = this.state;
        return (
            <div className='add-body'>
                <section className='AddCourse'>
                    <h2 className='make-course'>Create a Course</h2>
                    <form
                        className='AddCourse_form'
                        onSubmit={this.handleSubmit}
                    >
                        <div className='AddCourse_error' role='alert'>
                            {error && <p>{error.message}</p>}
                        </div>
                        <input 
                        type='hidden'
                        name='id'
                        />

                        <div className='add-fields'>
                            <label 
                                htmlFor='project_id'
                                className='form-labels'
                            >
                                Registration Number
                            {' '}
                                <Required />
                            </label>
                            <br />
                            <input
                                type='text'
                                name='project_id'
                                id='project_id'
                                placeholder='e.g., 375565'
                                className='inputs'
                                required
                            />
                        </div>
                        <div className='add-fields'>
                            <label 
                                htmlFor='course_number'
                                className='form-labels'
                            >
                                Course Number
                            {' '}
                                <Required />
                            </label>
                            <br />
                            <input
                                type='text'
                                name='course_number'
                                id='course_number'
                                placeholder='e.g., MGMT X 495.6'
                                className='inputs'
                                required
                            />
                        </div>
                        <div className='add-fields'>
                            <label 
                                htmlFor='course_name'
                                className='form-labels'
                            >
                                Course Title
                            {' '}
                                <Required />
                            </label>
                            <br />
                            <input
                                type='text'
                                name='course_name'
                                id='course_name'
                                placeholder='e.g., Intro to Budgeting'
                                className='inputs'
                                required
                            />
                        </div>
                        <div className='add-fields'>
                            <label 
                                htmlFor='quarter'
                                className='form-labels'
                            >
                                Quarter
                            {' '}
                                <Required />
                            </label>
                            <br />
                            <input
                                type='text'
                                name='quarter'
                                id='quarter'
                                placeholder='e.g., Winter 2021'
                                className='inputs'
                                required
                            />
                        </div>
                        <div className='add-fields'>
                            <label 
                                htmlFor='program_area'
                                className='form-labels'    
                            >
                                Program Area
                            {' '}
                                <Required />
                            </label>
                            <br />
                            <input
                                type='text'
                                name='program_area'
                                id='program_area'
                                placeholder='e.g., LMC'
                                className='inputs'
                            />
                        </div>
                        <div className='add-fields'>
                            <label
                                htmlFor='instructor_name'
                                className='form-labels'
                            >
                                Instructor Name
                            {' '}
                            </label>
                            <br />
                            <input
                                type='text'
                                name='instructor_name'
                                id='instructor_name'
                                placeholder='e.g., Ron Howard'
                                className='inputs'
                            />
                        </div>
                        <div className="syllabus">
                            <div className="legend">
                                <h2 className='legend-item'>Syllabus</h2>
                                    <div className='legend-item legend-sub'>
                                        <div className='subs'>0 = deficient /&nbsp;</div>
                                        <div className='subs'>1 = developing /&nbsp;</div>
                                        <div className='subs'>2 = accomplished /&nbsp;</div>
                                        <div className='subs'>3 = exemplary</div>
                                    </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q1'>
                                        The online course includes a syllabus outlining course objectives, learning outcomes, evaluation methods, books and supplies, technical and proctoring requirements, and other related course information, making course requirements transparent.
                                        <Required />
                                    </label>
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q1'
                                        id='q1'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q2'>
                                        Lesson Plans/Weekly Assignments & Point Value of an Assignment.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q2'
                                        id='q2'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q3'>
                                        Course is designed so that students develop necessary knowledge and skills to meet measurable course and program learning outcomes.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q3'
                                        id='q3'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q4'>
                                        Expectations for assignment completion, grade policy and faculty response are clearly provided in the course syllabus.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q4'
                                        id='q4'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>    
                        </div>

                        <div className="course-content">
                            <div className="legend">
                                <h2 className='legend-item'>Course Content</h2>
                                <div className='legend-item legend-sub'>
                                    <div className='subs'>0 = deficient /&nbsp;</div>
                                    <div className='subs'>1 = developing /&nbsp;</div>
                                    <div className='subs'>2 = accomplished /&nbsp;</div>
                                    <div className='subs'>3 = exemplary</div>
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q5'>
                                        There is consistency in the design of course navigation and utilization of course components to support student retention and quality.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q5'
                                        id='q5'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q6'>
                                        A process is followed that ensures that permissions (Creative Commons, Copyright, Fair Use, Public Domain, etc.) are in place for appropriate use of online course materials.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q6'
                                        id='q6'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q7'>
                                        Instructional materials are easily accessed by students with disabilities via alternative instructional strategies and/or referral to special institutional resources.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q7'
                                        id='q7'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>  
                        </div>

                        <div className="student-teacher">
                            <div className="legend">
                                <h2 className='legend-item stu-teach'>Student/Teacher Interaction</h2>
                                <div className='legend-item legend-sub'>
                                    <div className='subs'>0 = deficient /&nbsp;</div>
                                    <div className='subs'>1 = developing /&nbsp;</div>
                                    <div className='subs'>2 = accomplished /&nbsp;</div>
                                    <div className='subs'>3 = exemplary</div>
                                </div>
                            </div>

                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q8'>
                                        Feedback on student assignments and questions is constructive and provided in a timely manner. (Grades/Discussions)
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q8'
                                        id='q8'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q9'>
                                        Instructors use effective strategies to create a presence in the course.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q9'
                                        id='q9'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div> 
                            <div className="question">
                                <div className='add-labels'>
                                    <label htmlFor='q10'>
                                        Opportunities/tools are provided to encourage student-student and faculty-student collaboration/interaction (i.e., discussion boards, web conferencing, instant messaging, etc.) if appropriate.
                                        <Required />
                                    </label>   
                                </div>
                                <div className='add-items'>
                                    <NumericInput 
                                        name='q10'
                                        id='q10'
                                        className='q-inputs inputs'
                                        type="number"
                                        min={0}
                                        max={3}
                                        mobile='auto'
                                        required
                                    />
                                </div>
                            </div> 
                        </div>
                        <br />
                        <div className='add-fields'>
                            <label htmlFor='notes'>
                                Notes
                                {' '}
                            </label>
                            <br />
                            <textarea
                                name='notes'
                                id='notes'
                                className='inputs textarea'
                                placeholder='e.g., missing grades (01/12/2021)'
                            />
                        </div>

                        <div className='AddCourse_buttons'>
                            <button
                                type='submit'
                                className='butts'>
                                Save
                            </button>
                            {' '}
                            <button
                                type='button'
                                onClick={this.handleClickCancel}
                                className='butts'>
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            </div >
        )
    }
}

export default AddCourse;