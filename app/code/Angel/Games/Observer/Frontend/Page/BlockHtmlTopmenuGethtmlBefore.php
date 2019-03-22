<?php


namespace Angel\Games\Observer\Frontend\Page;

use Magento\Framework\Data\Tree\Node;
use Magento\Framework\UrlInterface;

class BlockHtmlTopmenuGethtmlBefore implements \Magento\Framework\Event\ObserverInterface
{
    /**
     * @var UrlInterface
     */
    protected $urlBuilder;

    public function __construct(
        UrlInterface $urlBuilder
    ){
        $this->urlBuilder = $urlBuilder;
    }

    /**
     * Execute observer
     *
     * @param \Magento\Framework\Event\Observer $observer
     * @return void
     */
    public function execute(
        \Magento\Framework\Event\Observer $observer
    ) {
        $menu = $observer->getMenu();
        $tree = $menu->getTree();
        $data = [
            'name'      => __('Games'),
            'id'        => 'game_menu_item',
            'url'       => $this->urlBuilder->getUrl('games'),
            'is_active' => false
        ];
        $node = new Node($data, 'id', $tree, $menu);
        $menu->addChild($node);


        $data = [
            'name'      => __('Freecell Solitaire Game'),
            'id'        => 'freecellSolitaire_menu_item',
            'url'       => $this->urlBuilder->getUrl('games/freecellSolitaire'),
            'is_active' => false
        ];
        $processing = new Node($data, 'id', $tree, $node);
        $node->addChild($processing);

        $data = [
            'name'      => __('Slot Machine Space Adventure Casino Game'),
            'id'        => 'slotMachineSpaceAdventureCasino_menu_item',
            'url'       => $this->urlBuilder->getUrl('games/slotMachineSpaceAdventureCasino'),
            'is_active' => false
        ];
        $processing = new Node($data, 'id', $tree, $node);
        $node->addChild($processing);

        $data = [
            'name'      => __('Ultimate Sudoku Game'),
            'id'        => 'ultimatesudoku_menu_item',
            'url'       => $this->urlBuilder->getUrl('games/ultimatesudoku'),
            'is_active' => false
        ];
        $processing = new Node($data, 'id', $tree, $node);
        $node->addChild($processing);

        $data = [
            'name'      => __('Blackjack Casino Game'),
            'id'        => 'blackjackCasino_menu_item',
            'url'       => $this->urlBuilder->getUrl('games/blackjackCasino'),
            'is_active' => false
        ];
        $processing = new Node($data, 'id', $tree, $node);
        $node->addChild($processing);

        $data = [
            'name'      => __('Bubble Shooter Game'),
            'id'        => 'bubbleShooter_menu_item',
            'url'       => $this->urlBuilder->getUrl('games/bubbleShooter'),
            'is_active' => false
        ];
        $processing = new Node($data, 'id', $tree, $node);
        $node->addChild($processing);

        $data = [
            'name'      => __('Slot Machine Jackpot 777 Game'),
            'id'        => 'slotMachineJackpot_menu_item',
            'url'       => $this->urlBuilder->getUrl('games/slotMachineJackpot'),
            'is_active' => false
        ];
        $processing = new Node($data, 'id', $tree, $node);
        $node->addChild($processing);
    }
}
