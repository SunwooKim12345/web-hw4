const sql = require("./db.js");

const Notes = function( note ) {
    this.id = note.id;
    this.text = note.text;
    this.lastUpdatedDate = note.lastUpdatedDate;
}

const Users = function( user ) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.colorScheme = user.colorScheme;
    this.image = user.image;
}


Notes.getAll = ( result ) => {
    console.log( "get All!" );
    let query = "SELECT * FROM notes";

    sql.query( query, ( err, res ) => {
        if ( err ) {
          console.log( "error: ", err );
          result( null, err );

          return;
        }
    
        console.log( "notes: ", res );

        return result( null, res );
      });
}

Notes.insert = ( newNote, result ) => {
    console.log( "Insert New Note!" );
    let query = "INSERT INTO notes (text, lastUpdatedDate) VALUES (?, ?)";
    let values = [ newNote.text, newNote.lastUpdatedDate ];

    sql.query( query, values, ( err, res ) => {
        if ( err ) {
            console.log( "error: ", err );
            result( null, err );

            return;
        }

        console.log( "Inserted note: ", res );

        return result( null, res );
    });
};

Notes.delete = ( deleteNote, result ) => {
    console.log( "Delete note!" );
    let query = "DELETE FROM notes WHERE id=?";
    let values = [ deleteNote ];

    sql.query( query, values, ( err, res ) => {
        if ( err ) {
            console.log( "error: ", err );
            result( null, err );

            return;
        }

        console.log( "Deleted note: ", res );

        return result( null, res )
    })
}

Notes.update = ( id, updateNote, result ) => {
    console.log( "Update note!" );
    let query = "UPDATE notes SET text=?, lastUpdatedDate=? WHERE id=?";
    let values = [updateNote.text, updateNote.lastUpdatedDate, id];

    sql.query( query, values, ( err, res ) => {
        if ( err ) {
            console.log( "error: ", err );
            result( null, err );

            return;
        }

        console.log( "Updated note: ", res );

        return result( null, res )
    })
}

Users.getAll = ( result ) => {
    console.log( "get All!" );
    let query = "SELECT * FROM users";

    sql.query( query, ( err, res ) => {
        if ( err ) {
          console.log( "error: ", err );
          result( null, err );
          return;
        }
    
        console.log( "users: ", res );
        return result( null, res );
      });
}


Users.update = ( id, updateUser, result ) => {
    console.log( "Update user!" );
    let query = "UPDATE users SET name=?, email=?, colorScheme=? WHERE id=?";
    let values = [updateUser.name, updateUser.email, updateUser.colorScheme, id];

    sql.query( query, values, ( err, res ) => {
        if ( err ) {
            console.log( "error: ", err );
            result( null, err );

            return;
        }

        console.log( "Updated note: ", res );

        return result( null, res )
    })
}

Users.updateImage = ( id, updateUser, result ) => {
    console.log( "Update user!" );
    let query = "UPDATE users SET image=? WHERE id=?";
    let values = [updateUser.image, id];

    sql.query( query, values, ( err, res ) => {
        if ( err ) {
            console.log( "error: ", err );
            result( null, err );

            return;
        }

        console.log( "Updated note: ", res );

        return result( null, res )
    })
}

module.exports = {
    Notes,
    Users
};
