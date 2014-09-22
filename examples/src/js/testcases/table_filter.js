StandaloneDashboard(function(db) {

  var table = new TableComponent('table1');
  table.setCaption("Movies & Ratings");
  table.setDimensions (6,6);
  table.setRowsPerPage (8);
  table.addColumn('rank', "Rank");
  table.addColumn('title', "Title");
  table.addColumn('rating', "Rating");

  table.addRow({'rank': 1, 'title': 'The Shawshank Redemption', 'rating': 9.2});
  table.addRow({'rank': 2, 'title' :'The Godfather', 'rating' : 9.2});
  table.addRow({'rank': 3, 'title' :'The Godfather part II', 'rating' : 9});
  table.addRow({'rank' : 4, 'title' :'The Dark Knight', 'rating' : 8.9});
  table.addRow({'rank' : 5, 'title' :'Pulp Fiction', 'rating' : 8.9});
  table.addRow({'rank' : 6, 'title' :'The Good, the Bad and the Ugly', 'rating' : 8.9});
  table.addRow({'rank' : 7, 'title' :'Schindler"s List', 'rating' : 8.9});
  table.addRow({'rank' : 8, 'title' :'Angry Men', 'rating' : 8.9});

  var filter = new FormComponent('form');
  filter.setCaption('Filter');
  filter.setDimensions(5, 3);
  filter.addSelectField('rating_filter', 'Rating Greater Than', [5, 6, 7, 8]);

  filter.onApplyClick(function() {
    var inputValues = filter.getAllInputValues();

    // Handle Logic here..
  });

  db.addComponent(table);
  db.addComponent(filter);

});