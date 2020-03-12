import {
  getNameDescriptionTableColumn,
  getCopyWithContentTableColumn,
} from '@/utils/common/tableColumn'

export default {
  created () {
    const DEVICE_MAP = {
      '10de': 'nvidia',
      '1002': 'amd',
    }
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row, 'gpu-detail') }>{ row.name }</side-page-trigger>
          )
        },
      }),
      {
        field: 'dev_type',
        title: '设备类型',
        width: 120,
      },
      {
        field: 'model',
        title: '设备型号',
        minWidth: 120,
        showOverflow: 'ellipsis',
        slots: {
          default: ({ row }, h) => {
            const device = row.vendor_device_id.split(':')[0]
            if (!device) {
              return row.model
            }
            return [
              <div class='d-flex'>
                <span class='text-truncate'>{ row.model }</span>
                <icon class="ml-1" style="line-height: 24px" type={ DEVICE_MAP[device] } />
              </div>,
            ]
          },
        },
      },
      {
        field: 'guest',
        title: '关联主机',
        minWidth: 100,
        showOverflow: 'ellipsis',
        slots: {
          default: ({ row }, h) => {
            return [
              <div class='text-truncate'>
                <list-body-cell-wrap copy={true} row={row} onManager={this.onManager} hideField={ true }>
                  <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row, 'servers-list') }>{ row.guest }</side-page-trigger>
                </list-body-cell-wrap>
                {row.guest_status ? <status status={ row['guest_status'] } statusModule='server'/> : ''}
              </div>,
            ]
          },
        },
      },
      getCopyWithContentTableColumn({
        field: 'host',
        title: '所在宿主机',
        hideField: true,
        slotCallback: row => row.host || row.host_id,
      }),
    ]
  },
}