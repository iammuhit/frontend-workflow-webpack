import PrettyHtmlWebpackPlugin from '../../plugins/PrettyHtml';
import $ from '../../libraries/Loader';

const constants = $.config('constants');

export default new PrettyHtmlWebpackPlugin({
    end_with_newline : true,
    indent_size      : 4,
    indent_with_tabs : false,
    indent_inner_html: false,
    preserve_newlines: false,
});
