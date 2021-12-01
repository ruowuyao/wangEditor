/**
 * @description tooltip 事件
 * @author lichunlin
 */

import $, { DomElement } from '../../../utils/dom-core'
import Tooltip, { TooltipConfType } from '../../menu-constructors/Tooltip'
import Editor from '../../../editor/index'

/**
 * 生成 Tooltip 的显示隐藏函数
 */
export function createShowHideFn(editor: Editor) {
    let tooltip: Tooltip | null
    const t = (text: string, prefix: string = ''): string => {
        return editor.i18next.t(prefix + text)
    }

    /**
     * 显示 tooltip
     * @param $node 链接元素
     */
    function showImgTooltip($node: DomElement) {
        const conf: TooltipConfType = [
            {
                $elem: $("<span class='w-e-icon-trash-o'></span>"),
                onBlur: () => { },
                onClick: (editor: Editor, $node: DomElement) => {
                    // 选中img元素
                    editor.selection.createRangeByElem($node)
                    editor.selection.restoreSelection()
                    editor.cmd.do('delete')
                    // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                    return true
                },
            },
            {
                $elem: $('<span>33%</span>'),
                onBlur: () => { },
                onClick: (editor: Editor, $node: DomElement) => {
                    $node.attr('width', '33%')
                    $node.removeAttr('height')

                    // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                    return true
                },
            },
            {
                $elem: $('<span>50%</span>'),
                onBlur: () => { },
                onClick: (editor: Editor, $node: DomElement) => {
                    $node.attr('width', '50%')
                    $node.removeAttr('height')

                    // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                    return true
                },
            },
            {
                $elem: $('<span>100%</span>'),
                onBlur: () => { },
                onClick: (editor: Editor, $node: DomElement) => {
                    $node.attr('width', '100%')
                    $node.removeAttr('height')

                    // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                    return true
                },
            },
        ]


        conf.push({
            $elem: $(`<span>${t('重置')}</span>`),
            onBlur: () => { },
            onClick: (editor: Editor, $node: DomElement) => {
                $node.removeAttr('width')
                $node.removeAttr('height')

                // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
                return true
            },
        })

        conf.push({
            $elem: $(`<span style="font-size:14px !important;vertical-align: middle;">跳转链接：</span><input placeholder="插入跳转链接" id="link"></input>`),
            onClick: () => { },
            onBlur: (editor: Editor, $node: DomElement) => {
                console.log(editor);
                $node.attr('data-href', $('#link').val())
                $node.attr('style', 'max-width:100%;')
                $node.attr('contenteditable', 'false')
                let outerHTML = $node.elems[0].outerHTML
                let html = '<a href="' + $('#link').val() + '" target="_blank">' + outerHTML + '</a>'
                let parent = $node.parent()
                parent.html(html)
                // 返回 true，表示执行完之后，隐藏 tooltip。否则不隐藏。
            },
        })



        tooltip = new Tooltip(editor, $node, conf)
        tooltip.create()
    }

    /**
     * 隐藏 tooltip
     */
    function hideImgTooltip() {
        console.log('移除 tooltip');

        // 移除 tooltip
        if (tooltip) {
            tooltip.remove()
            tooltip = null
        }
    }

    return {
        showImgTooltip,
        hideImgTooltip,
    }
}

/**
 * 绑定 tooltip 事件
 * @param editor 编辑器实例
 */
export default function bindTooltipEvent(editor: Editor) {
    const { showImgTooltip, hideImgTooltip } = createShowHideFn(editor)
    console.log(123);

    // 点击图片元素是，显示 tooltip
    editor.txt.eventHooks.imgClickEvents.push(showImgTooltip)

    // 点击其他地方，或者滚动时，隐藏 tooltip
    editor.txt.eventHooks.clickEvents.push(hideImgTooltip)
    editor.txt.eventHooks.keyupEvents.push(hideImgTooltip)
    editor.txt.eventHooks.toolbarClickEvents.push(hideImgTooltip)
    editor.txt.eventHooks.menuClickEvents.push(hideImgTooltip)
    editor.txt.eventHooks.textScrollEvents.push(hideImgTooltip)
    editor.txt.eventHooks.imgDragBarMouseDownEvents.push(hideImgTooltip)

    // change 时隐藏
    editor.txt.eventHooks.changeEvents.push(hideImgTooltip)
}


/**
 * 生成 Tooltip:插入或者编辑链接 的显示隐藏函数
 */

function addTooltip(editor: Editor) {

}
