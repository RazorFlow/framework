rf.StandaloneDashboard(function(db){
    var table = new TableComponent ();
    table.setDimensions (12, 8);
    table.setCaption ('Change caption to IMDB Top 20 Movies');
    table.addColumn ('rank', 'Rank');
    table.addColumn ('title', 'Title');
    table.addColumn ('year', 'Year');
    table.addColumn ('rating', 'IMDB Rating');

    table.addRow ({
        'rank': 1,
        'title': 'The Shawshank Redemption',
        'year': '1994',
        'rating': 9.2
    });

    table.addRow ({
        'rank': 2,
        'title': 'The Godfather',
        'year': '1972',
        'rating': 9.2
    });

    table.addRow ({
        'rank': 3,
        'title': 'The Godfather part II',
        'year': '1974',
        'rating': 9.0
    });

    table.addRow ({
        'rank': 4,
        'title': 'The Dark Knight',
        'year': '2008',
        'rating': 8.9
    });

    table.addRow ({
        'rank': 5,
        'title': 'Pulp Fiction',
        'year': '1994',
        'rating': 8.9
    });

    table.addRow ({
        'rank': 6,
        'title': 'The Good, the Bad and the Ugly',
        'year': '1966',
        'rating': 8.9
    });

    table.addRow ({
        'rank': 7,
        'title': 'Schindler\'s List',
        'year': '1993',
        'rating': 8.9
    });

    table.addRow ({
        'rank': 8,
        'title': 'Angry Men',
        'year': '1957',
        'rating': 8.9
    });

    table.addRow ({
        'rank': 9,
        'title': 'The Lord of the Rings: The Return of the King',
        'year': '2003',
        'rating': 8.9
    });

    table.addRow ({
        'rank': 10,
        'title': 'Fight Club',
        'year': '1999',
        'rating': 8.8
    });

    table.addRow ({
        'rank': 11,
        'title': 'The Lord of the Rings: The Fellowship of the Ring',
        'year': '2001',
        'rating': 8.8
    });

    table.addRow ({
        'rank': 12,
        'title': 'Star Wars: Episode V - The Empire Strikes Back',
        'year': '1980',
        'rating': 8.8
    });

    table.addRow ({
        'rank': 13,
        'title': 'Inception',
        'year': '2010',
        'rating': 8.7
    });

    table.addRow ({
        'rank': 14,
        'title': 'Forrest Gump',
        'year': '1994',
        'rating': 8.7
    });

    table.addRow ({
        'rank': 15,
        'title': 'One Flew Over the Cuckoo\'s Nest',
        'year': '1975',
        'rating': 8.7
    });

    table.addRow ({
        'rank': 16,
        'title': 'The Lord of the Rings: The Two Towers',
        'year': '2002',
        'rating': 8.7
    });

    table.addRow ({
        'rank': 17,
        'title': 'Goodfellas',
        'year': '1990',
        'rating': 8.7
    });

    table.addRow ({
        'rank': 18,
        'title': 'Star Wars: Episode IV - A New Hope',
        'year': '1977',
        'rating': 8.7
    });

    table.addRow ({
        'rank': 19,
        'title': 'The Matrix',
        'year': '1999',
        'rating': 8.7
    });

    table.addRow ({
        'rank': 20,
        'title': 'Seven Samurai',
        'year': '1954',
        'rating': 8.7
    });

    db.addComponent(table);
});
