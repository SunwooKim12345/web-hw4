const sql = require("./db.js");

const Notes = function( note ) {
    this.id = note.id;
    this.text = note.text;
    this.lastUpdatedDate = note.lastUpdatedDate;
    this.userEmail = note.userEmail;
}

const Users = function( user ) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.colorScheme = user.colorScheme;
    this.image = user.image;
    this.password = password;
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
    let query = "INSERT INTO notes (text, lastUpdatedDate, userEmail) VALUES (?, ?, ?)";
    let values = [ newNote.text, newNote.lastUpdatedDate, newNote.userEmail ];

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
    let query = "DELETE FROM notes WHERE userEmail=?";
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

Notes.update = ( user, updateNote, result ) => {
    console.log( "Update note!" );
    let query = "UPDATE notes SET text=?, lastUpdatedDate=? WHERE userEmail=?";
    let values = [updateNote.text, updateNote.lastUpdatedDate, user];

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

Users.insert = ( user, result ) => {
    console.log( "Insert New User!" );
    let query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    let values = [ user.name, user.email, user.password ];

    sql.query( query, values, ( err, res ) => {
        if ( err ) {
            console.log( "error: ", err );
            result( null, err );

            return;
        }

        console.log( "Inserted user ", res );

        return result( null, res );
    });
};

Users.update = ( user, updateUser, result ) => {
    console.log( "Update user!" );
    let query = "UPDATE users SET name=?, email=?, colorScheme=? WHERE user=?";
    let values = [updateUser.name, updateUser.email, updateUser.colorScheme, user];

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

Users.updateImage = ( user, updateUser, result ) => {
    console.log( "Update user!" );
    let query = "UPDATE users SET image=? WHERE user=?";
    let values = [updateUser.image, user];

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
