import Button from '../src/components/Button'

it('test', () => {
  expect(Button).toBeDefined()
})

it('Button is a subclass of Phaser.GameObjects.Container', () => {
  expect(Button).toBeSubclassOf(Phaser.GameObjects.Container);
});
