<template>
  <div>
    <CRow>
      <CButton color="primary" @click="addModal = true">Tambah Perusahaan</CButton>
      <CModal
        title="Tambah Perusahaan"
        color="primary"
        size="lg"
        :show.sync="addModal"
      >
        <CRow>
          <CCol sm="12">
            <CInput
              label="Nama Perusahaan"
              id="nama_pt"
              v-model.trim="ptAdd.nama_pt"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Nama Penanggungjawab"
              id="penanggungjawab_pt"
              v-model.trim="ptAdd.penanggungjawab_pt"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Nomor Telepon Perusahaan"
              id="telepon_pt"
              v-model.trim="ptAdd.telepon_pt"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Alamat Perusahaan"
              id="alamat_pt"
              v-model.trim="ptAdd.alamat_pt"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CInput
              label="Alamat Pengiriman"
              id="alamat_pengiriman"
              v-model.trim="ptAdd.alamat_pengiriman"
            />
          </CCol>
        </CRow>
        <template #footer>
          <CButton color="primary" @click="onSubmitAdd()">Tambah</CButton>
          <span>{{"  "}}</span>
          <CButton color="primary" variant="outline" @click="addModal = false">Tutup</CButton>
        </template>
      </CModal>
      <CCol sm="12">
        <CDataTable
          :items="pts"
          :fields="fields"
          column-filter
          table-filter
          items-per-page-select
          hover
          sorter
          pagination
        >
          <template #show_details="{item, index}">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(index)"
              >
                {{details.includes(index) ? 'Hide' : 'Show'}}
              </CButton>
            </td>
          </template>
          <template>

          </template>
          <template #details="{item, index}">
            <CCollapse :show="details.includes(index)">
              <CModal
                title="Edit Perusahaan"
                color="primary"
                size="lg"
                :show.sync="editModal"
              >
                <CRow>
                  <CCol sm="12">
                    <CInput
                      label="Nama Perusahaan"
                      id="nama_pt"
                      v-model.trim="item.nama_pt"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12">
                    <CInput
                      label="Nama Penanggungjawab"
                      id="penanggungjawab_pt"
                      v-model.trim="item.penanggungjawab_pt"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12">
                    <CInput
                      label="Nomor Telepon Perusahaan"
                      id="telepon_pt"
                      v-model.trim="item.telepon_pt"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12">
                    <CInput
                      label="Alamat Perusahaan"
                      id="alamat_pt"
                      v-model.trim="item.alamat_pt"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12">
                    <CInput
                      label="Alamat Pengiriman"
                      id="alamat_pengiriman"
                      v-model.trim="item.alamat_pengiriman"
                    />
                  </CCol>
                </CRow>
                <template #footer>
                  <CButton color="primary" @click="onSubmit(item)">Edit</CButton>
                  <span>{{"  "}}</span>
                  <CButton color="primary" variant="outline" @click="editModal = false">Tutup</CButton>
                </template>
              </CModal>
              <CCardBody>
                <CJumbotron>
                  <h1 class="header">{{item.nama_pt}}</h1>
                  <p class="lead">
                    Penanggung Jawab Perusahaan : {{item.penanggungjawab_pt}}<br>
                    Telepon Perusahaan : {{item.telepon_pt}}<br>
                    Alamat Perusahaan : {{item.alamat_pt}}<br>
                    Alamat Pengiriman : {{item.alamat_pengiriman}}<br>
                  </p>
                  <CButton color="primary" @click="editModal = true">Edit</CButton>
                  <span>{{"  "}}</span>
                  <CButton color="danger" @click="deletept(item._id)">Hapus</CButton>
                </CJumbotron>
              </CCardBody>
            </CCollapse>
          </template>
        </CDataTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Pts',
  data () {
    return {
      fields: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        { key: 'nama_pt', label: 'Nama Perusahaan', sorter: true, _style:'width:30%;'},
        { key: 'telepon_pt', sorter:false, label: 'Telepon Perusahaan', _style:'width:30%;'},
        { key: 'penanggungjawab_pt', sorter:false, label: 'Penanggung Jawab Perusahaan', _style:'width:30%;'},
        {
          key: 'show_details',
          label: '',
          _style:'width:10%;',
          sorter: false,
          filter: false
        }
      ],
      pts: [],
      ptAdd: {},
      ptEdit:[],
      details: [],
      fixedToasts: 0,
      editModal: false,
      addModal: false
    }
  },
  created () {
    axios.get('http://localhost:3000/pt')
      .then(response => {
        this.pts = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },

    getShuffledUsersData () {
      return this.shuffleArray(usersData.slice(0))
    },

    toggleDetails (index) {
      const position = this.details.indexOf(index)
      position !== -1 ? this.details.splice(position, 1) : this.details.push(index)
    },

    deletept (ptid) {
      if(confirm('Apakah anda yakin?')){
        axios.delete('http://localhost:3000/pt/' + ptid)
          .then((result) => {
            this.addFixedToast
            const index = this.pts.findIndex(pt => pt._id === ptid) // find the post index
            if (~index){
              this.pts.splice(index, 1)
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    },
    onSubmit (item) {
      //evt.preventDefault()
      axios.put('http://localhost:3000/pt/' + item._id, item)
        .then(response => {
          this.editModal = false
        })
        .catch(e => {
          console.log(e)
        })
    },
    onSubmitAdd (item) {
      //evt.preventDefault()
      axios.post('http://localhost:3000/pt', this.ptAdd)
        .then(response => {
          this.pts.push(response.data)
          this.addModal = false
          // this.$router.push({
          //   name: 'ShowPt',
          //   params: { id: response.data._id }
          // })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
