# aframe-proximity
 A proximity detector component for Aframe that triggers an event when the distance between two entities is the established

## Usage
```html
    <a-box color="red" id="red"></a-box>
    <a-box color="blue" id="blue" proximity="target: #red; drawLine: true; distance: 10;"></a-box>
```

| Property  | Description  | Default |
| :------------ |:---------------| -----:|
| target      |  Aframe selector of target entity to measure distance with current entity | null |
| distance      | The distance where the event starts to throw | 1 |
| drawLine      | Show or not a line between the measured objects | false |
| color1      | if drawLine is true, the line's color when distance es greater than distance param | #0000FF |
| color2      | if drawLine is true, the line's color when distance es lower than distance param | #00FF00 |
| customDataEvent  | A custom data (JSON as String) to attatch to event when it triggers  | {"message": "no custom data provided"} |
