  // $(function(){
  //   window.tv = $("#docTree").kendoTreeView ().data('kendoTreeView');
  //   // var root = window.tv.findByText("Documentation");
  //   var doc_root = window.doc_id;
  //   var root = $('li[data-id=' + doc_root + ']');

  //   if(window.doc_is_class) {
  //     root = $('li[data-class=' + doc_root + ']');
  //   }
  //   window.tv.select(root);
  //   var rootParent = window.tv.parent(root);
    
  //   for(var i = 0; i < 20; i ++) {if (rootParent.length == 0) { break; } root = rootParent; window.tv.expand(root); rootParent = window.tv.parent(root); }
  //   $('pre').addClass('language-javascript');
  //   Prism.highlightAll();
  //   $('.zoom').on('click', function() {
  //     $(this).parent().find('.zoommodal').modal('show');
  //   })
  //   $('.live').on('click', function() {
  //     $(this).parent().find('.livemodal').modal('show');
  //   })
  // })

function buildTreeView ($node, depth) {
  if(!$node.length) return;
  var $root = $node;
  if(depth > 1)
    $node.addClass('collapsed');
  $root.children().each(function() {
    var $parent = $(this);
    // $(this).addClass('rf-tree-node');
    $(this).find('a:first').addClass('rf-tree-node-title');
    $(this).find('span:first').addClass('rf-tree-node-title');
    $(this).addClass('level-' + depth);
    var $arrow = $('<span/>').addClass('arrow');
    $(this).prepend($arrow);
    if($(this).find('ul:first').length) {
      $(this).addClass('rf-tree-node')
      $arrow.addClass('right-arrow collapsed');
      $parent.find('ul:first').addClass('rf-tree');
      var $clickableWrapper = $('<span/>').addClass('clickableWrapper')
      var $clickable = $('<span/>').addClass('clickable');
      $clickableWrapper.html($clickable)
      $parent.prepend($clickableWrapper);
      $arrow.on('click', function(e) {
          if($(this).hasClass('collapsed')) {
            console.log('sliding down');
            // $parent.find('ul:first').removeClass('collapsed');
            $parent.find('ul:first').slideDown();
            $(this).removeClass('collapsed')
            $(this).removeClass('right-arrow').addClass('down-arrow');
          } else {
            console.log('sliding up');
            // $parent.find('ul:first').addClass('collapsed');
            $parent.find('ul:first').slideUp();
            $(this).addClass('collapsed');
            $(this).removeClass('down-arrow').addClass('right-arrow');
          }
          e.stopPropagation();
      });
    }
    buildTreeView($parent.find('ul:first'), depth + 1);
  });
}

function reverseUncollapse ($node) {
  var $parent = $node.parents('ul:first');
  if($parent.length) {
    $parent.removeClass('collapsed');
    reverseUncollapse($parent);
  }
}

function reverseSelect ($node) {
  var $parent = $node.parents('li:first');
  var $grandParent = $parent.parents('li:first');
  if($parent.length) {
    $parent.addClass('selected');
    if($grandParent.find('.arrow:first').hasClass('right-arrow')) {
      $grandParent.find('.arrow:first').removeClass('right-arrow').addClass('down-arrow').removeClass('collapsed');  
    }
    reverseSelect($parent);
  }
}

$(function() {
  buildTreeView($('#docTree'), 1);
  var $a = $('a[href="' + window.location.pathname + '"]');
  reverseUncollapse($a);
  reverseSelect($a);
  var codeBoxes = $('pre');
  $('li').on('click', function(e) {
    e.stopPropagation();
  });
  $('.rf-tree-node').on('click', function(e) {
    $(this).find('.arrow:first').trigger('click');
    e.stopPropagation();
  })
  // .on('mouseenter', function(e) {
  //   $(this).css({
  //     background: '#FFF'
  //   });
  //   e.stopPropagation();
  // }).on('mouseout', function(e) {
  //   $(this).css({
  //     background: 'inherit'
  //   });
  //   e.stopPropagation();
  // });

  codeBoxes.each(function() {
    var code = $(this).text().trim();
    var div = $('<div/>').addClass('codeBox');
    $(this).replaceWith(div);
    CodeMirror(div[0], {
      value: code,
      mode: 'javascript',
      theme: 'rftheme',
      lineNumbers: true,
      readOnly: true
    });
  });

  $(".params_options").on("click", function(e) {
    e.preventDefault();
    var $link = $(this);
    var id = $(this).data("id");
    var $table = $("table#" + id);
    var hidden = $table.is(":hidden");
    $table.slideDown("", function() {
      if(hidden) {
        $link.text("Hide");
          $link.closest('.propsTableInactive').removeClass().addClass('propsTable');
        $table.closest('.optionsTableInactive').removeClass().addClass('optionsTable');
      }
      else {
        $link.text("Show");
        $link.closest('.propsTable').removeClass().addClass('propsTableInactive');
        $table.closest('.optionsTable').removeClass().addClass('optionsTableInactive');
      }
    });
  });

});