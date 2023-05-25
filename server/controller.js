const { Notes, Users } = require("./model");

const getNotesTable = ( req, res ) => {
    Notes.getAll( ( err, data ) => {
      if ( err ) {
        res.status(500).send({
          message: err.message || "Some error occurred."
        });
      } else {
        const notes = data.map(item => {
          return {
            id: item.id,
            text: item.text,
            lastUpdatedDate: item.lastUpdatedDate
          };
        });
  
        res.send({ notes });
      }
    });
  };


const insertNote = ( req, res ) => {
    const newNote = req.body;


    Notes.insert( newNote, ( err, data ) => {
        if ( err ) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else {
            res.json( data );
        }
    })
}

const deleteNote = ( req, res ) => {
    const id = req.params.id;

    Notes.delete( id, ( err, data ) => {
        if ( err ) {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred."
            });
        } else {
            res.json( data );
        }
    })
}
const updateNote = ( req, res ) => {
    const id = req.params.id;
    const updateNote = req.body;

    Notes.update( id, updateNote, ( err, data ) => {
        if ( err ) {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred."
            });
        } else {
            res.json( data );
        }
    })
}

const getUsersTable = ( req, res ) => {
    Users.getAll( ( err, data ) => {
        if ( err ) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        } else {
            const users = data.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  email: item.email,
                  colorScheme: item.colorScheme,
                  image: item.image
                };
              });
        
              res.send({ users });        
        }
    });
};

const updateUser = ( req, res ) => {
    const id = req.params.id;
    const updateUser = req.body;

    Users.update( id, updateUser, ( err, data ) => {
        if ( err ) {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred."
            });
        } else {
            res.json( data );
        }
    })
}

const updateProfile = ( req, res ) => {
    const id = req.params.id;
    const updateUser = req.body;

    Users.updateImage( id, updateUser, ( err, data ) => {
        if ( err ) {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred."
            });
        } else {
            res.json( data );
        }
    })
}


module.exports = {
    getNotesTable,
    getUsersTable,
    insertNote,
    deleteNote,
    updateNote,
    updateUser,
    updateProfile
};

