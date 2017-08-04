import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'
// import _ from 'lodash'
import './App.css'

// const getId = () => Math.random().toString(36).substr(2)

class Formulario extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <div className="col-md-6 col-md-offset-3">
      <div className="panel panel-primary">
        <div className="panel panel-heading">Add Post</div>
        <div className="panel-body">
          <form onSubmit={handleSubmit}>
              <div className="col-md-12 col-md-offset-3">
                <div className="row">
                    <div className="col-md-6">
                        <label>Title</label>
                        <Field name='title' component='input' className="form-control" required placeholder="Titulo"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                      <label>Body</label><br />
                      <Field name='body' component='textarea' className="form-control" required placeholder="Descripcion del post"/>
                    </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-danger">Enviar</button>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    )
  }
}

Formulario = reduxForm({
  form: 'postForm',
})(Formulario)


class App extends Component {
  
  constructor(props) {
    super(props)
    console.log('showForm: ',this.props.showForm)
    const { fetchPosts } = this.props
    fetchPosts()
  }
  
  render() {
    
    const { toggleForm, createPost, deletePost, posts } = this.props

    return (
      <div className="App">
        
        { console.log('App :: posts.adding: ', posts.adding) }
        { posts.adding ? <Formulario onSubmit={createPost} /> : null }
       
        <br />
        <br />
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            {posts.creating && <p>Creando todo...</p>}
            <br />
            {/*
            <button onClick={fetchPosts} type="button" className="btn btn-info" disabled={posts.fetching}>
              {posts.fetching ? 'Cargando...' : 'Fetch Post'}
            </button>
            */}
            <button onClick={ (e) => { e.preventDefault() ; toggleForm(posts.adding) } } type="button" className="btn btn-warning">
              {posts.adding ? 'Listado' : 'Agregar'}
            </button>
          </div>
        </div>
        <br />
        <br />
         {posts.adding ? (
            null
          ) : (
             <div className="col-md-8 col-md-offset-2">
              {posts.data.map(x =>
                <div className="panel panel-primary" key={x.id}>
                  <div className="panel panel-heading">
                    <div style={{float:'right'}}><button className="btn btn-danger btn-xs" onClick={() => deletePost(x.id) }>X</button></div>
                    {x.title}
                  </div>
                  <div className="panel-body">{x.body}</div>
                  <div className="panel-footer">Post Id: <b>{x.id}</b> User Id: <b>{x.userId}</b> name: <b>{x.user.name}</b> email: <b>{x.user.email}</b></div>
                </div>           
              )}
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  
  console.log('state: ', state)

  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => { 
    console.log("call FETCH_POSTS")
    dispatch({ type: 'FETCH_POSTS' })
  },
  toggleForm: (adding) => {
    console.log("call toggleForm: ", adding)
    dispatch({ type:'SHOW_FORM', payload: adding })
  },
  createPost: post => {
    post['userId'] =  1
    dispatch({ type: 'CREATE_POST', payload: { ...post, user: { name:'Juan Canepa', email:'jacanepa@gmail.com' } } })
    dispatch(change('postForm', 'title', ''))
    dispatch(change('postForm', 'body', ''))
  },
  // updatePost: post => dispatch({ type: 'UPDATE_POST', payload: post }),
  deletePost: id => {
    console.log('mapDispatchToProps :: deletePost :: id: ', id)
    dispatch({ type: 'DELETE_POST', payload: id }) 
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)